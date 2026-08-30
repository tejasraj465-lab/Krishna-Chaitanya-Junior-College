import { useEffect } from 'react';

let lockCount = 0;
let savedScrollY = 0;
let savedStyles: {
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
  bodyTouch: string;
} | null = null;

function applyLock() {
  const html = document.documentElement;
  const { body } = document;
  savedScrollY = window.scrollY;
  savedStyles = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
    bodyTouch: body.style.touchAction,
  };

  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${savedScrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
  body.style.touchAction = 'none';
}

function releaseLock() {
  if (!savedStyles) return;

  const html = document.documentElement;
  const { body } = document;
  html.style.overflow = savedStyles.htmlOverflow;
  body.style.overflow = savedStyles.bodyOverflow;
  body.style.position = savedStyles.bodyPosition;
  body.style.top = savedStyles.bodyTop;
  body.style.left = savedStyles.bodyLeft;
  body.style.right = savedStyles.bodyRight;
  body.style.width = savedStyles.bodyWidth;
  body.style.touchAction = savedStyles.bodyTouch;
  savedStyles = null;
  window.scrollTo(0, savedScrollY);
}

/** Locks document scroll while `locked` is true. Nested overlays share one lock. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) applyLock();
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) releaseLock();
    };
  }, [locked]);
}
