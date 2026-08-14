import { GoogleGenAI } from '@google/genai';
import { buildAiSystemPrompt, resolveCollegeGuideReply } from '../src/data/aiKnowledgeBase';
import { validateAiGuideRequest } from './validateAiRequest';

let aiClient: GoogleGenAI | null | undefined;

function getAiClient(): GoogleGenAI | null {
  if (aiClient !== undefined) return aiClient;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    aiClient = null;
    return aiClient;
  }

  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error('Gemini client initialization failed:', error);
    aiClient = null;
  }

  return aiClient;
}

export async function handleAiGuideRequest(body: unknown): Promise<{
  status: number;
  body: { reply?: string; error?: string };
}> {
  const validation = validateAiGuideRequest(body);
  if (validation.ok === false) {
    return { status: validation.status, body: { error: validation.error } };
  }

  const { message, history } = validation.data;
  const grounded = resolveCollegeGuideReply(message);

  if (grounded.confident) {
    return { status: 200, body: { reply: grounded.reply } };
  }

  const systemPrompt = buildAiSystemPrompt();
  const ai = getAiClient();

  if (ai) {
    try {
      const historyContext = history
        .map((entry) => `${entry.sender === 'user' ? 'User' : 'Assistant'}: ${entry.text || ''}`)
        .join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemPrompt}\n\n${historyContext ? `Recent conversation:\n${historyContext}\n\n` : ''}User Question: ${message}`,
              },
            ],
          },
        ],
      });

      const reply = response.text || grounded.reply;
      return { status: 200, body: { reply } };
    } catch (error) {
      console.error('Gemini API error:', error);
    }
  }

  return { status: 200, body: { reply: grounded.reply } };
}
