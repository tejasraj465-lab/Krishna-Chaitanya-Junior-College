import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Sparkles, 
  Tablet, 
  BrainCircuit, 
  BarChart3, 
  Tv, 
  Video, 
  Award, 
  BookOpen, 
  ChevronRight,
  GraduationCap,
  Layers,
  Target
} from 'lucide-react';
import { PROGRAM_DETAILS, ProgramDetail } from '../data/courseDetailsData';

interface CourseDetailModalProps {
  programId: string | null;
  onClose: () => void;
  onApplyForProgram: (programName: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  programId,
  onClose,
  onApplyForProgram
}) => {
  if (!programId || !PROGRAM_DETAILS[programId]) return null;

  const program: ProgramDetail = PROGRAM_DETAILS[programId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B3C91] via-[#072B6B] to-[#0A2558] text-white p-5 sm:p-8 relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-[#FBBF24] text-[#0B3C91] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {program.badge}
            </span>
            <span className="bg-white/10 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
              {program.stream} Stream
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
            {program.name}
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 mt-1 font-medium">
            {program.tagline}
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
          {/* Course Overview */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#0B3C91]">
              <BookOpen className="w-5 h-5 text-[#0B3C91]" />
              <h3 className="text-lg font-bold font-serif uppercase tracking-wider">Course Overview</h3>
            </div>
            <div className="space-y-3 text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
              {program.overview.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Course Structure */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#0B3C91]">
              <Layers className="w-5 h-5 text-[#0B3C91]" />
              <h3 className="text-lg font-bold font-serif uppercase tracking-wider">Course Structure</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {program.structure.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3.5 bg-blue-50/60 rounded-xl border border-blue-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Technology-Driven Learning for Rank-Oriented Preparation (If present) */}
          {program.techLearning && (
            <section className="space-y-4 bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-5 sm:p-7 rounded-3xl shadow-lg border border-blue-800">
              <div className="border-b border-blue-700/60 pb-3">
                <div className="flex items-center gap-2 text-[#FBBF24]">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-lg font-bold font-serif uppercase tracking-wider">
                    Technology-Driven Learning for Rank-Oriented Preparation
                  </h3>
                </div>
                <p className="text-xs text-blue-200 mt-1">
                  Krishna Chaitanya’s Next-Gen Academic Technology Framework
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* AI Integrated Model */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#FBBF24]">
                    <BrainCircuit className="w-4 h-4" />
                    <h4 className="font-bold text-sm text-white">AI-Integrated Rank Proven Model</h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {program.techLearning.aiModel}
                  </p>
                </div>

                {/* Free Learning Tablet */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#FBBF24]">
                    <Tablet className="w-4 h-4" />
                    <h4 className="font-bold text-sm text-white">Free Personal Learning Tablet</h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {program.techLearning.tablet}
                  </p>
                </div>

                {/* Complete Objective Exams on Tablet */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#FBBF24]">
                    <Target className="w-4 h-4" />
                    <h4 className="font-bold text-sm text-white">Complete Objective Exams on Tablet</h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {program.techLearning.examsOnTablet}
                  </p>
                </div>

                {/* 360 Exam Performance Analysis */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#FBBF24]">
                    <BarChart3 className="w-4 h-4" />
                    <h4 className="font-bold text-sm text-white">360° Exam Performance Analysis</h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {program.techLearning.analysis360}
                  </p>
                </div>

                {/* Digital Board Teaching */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#FBBF24]">
                    <Tv className="w-4 h-4" />
                    <h4 className="font-bold text-sm text-white">Digital Board Teaching</h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {program.techLearning.digitalBoard}
                  </p>
                </div>

                {/* Recorded Video Lectures */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#FBBF24]">
                    <Video className="w-4 h-4" />
                    <h4 className="font-bold text-sm text-white">Recorded Video Lectures</h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {program.techLearning.videoLectures}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Program Features / Advantages */}
          {(program.advantages || program.features) && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-[#0B3C91]">
                <Award className="w-5 h-5 text-[#0B3C91]" />
                <h3 className="text-lg font-bold font-serif uppercase tracking-wider">
                  {program.advantages ? 'Elite Program Advantages' : 'Program Features'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(program.advantages || program.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="w-2 h-2 rounded-full bg-[#0B3C91] mt-1.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Outcome */}
          <section className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-800">
              <GraduationCap className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-extrabold uppercase tracking-wider font-serif">Program Outcome</h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
              {program.outcome}
            </p>
          </section>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 sm:p-5 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Admissions open for 2026-27 batch across all campuses.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApplyForProgram(program.name);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
