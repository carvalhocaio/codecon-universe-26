"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover' | 'inViewHover' | 'click';
  clickMode?: 'once' | 'toggle';
}

type Direction = 'forward' | 'reverse';

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isDecrypted, setIsDecrypted] = useState<boolean>(animateOn !== 'click');

  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [direction] = useState<Direction>('forward');

  const availableChars = useMemo<string[]>(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
      : characters.split('');
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    },
    [availableChars]
  );

  const computeOrder = useCallback(
    (len: number): number[] => {
      const order: number[] = [];
      if (len <= 0) return order;
      if (revealDirection === 'start') {
        for (let i = 0; i < len; i++) order.push(i);
        return order;
      }
      if (revealDirection === 'end') {
        for (let i = len - 1; i >= 0; i--) order.push(i);
        return order;
      }
      const middle = Math.floor(len / 2);
      let offset = 0;
      while (order.length < len) {
        if (offset % 2 === 0) {
          const idx = middle + offset / 2;
          if (idx >= 0 && idx < len) order.push(idx);
        } else {
          const idx = middle - Math.ceil(offset / 2);
          if (idx >= 0 && idx < len) order.push(idx);
        }
        offset++;
      }
      return order.slice(0, len);
    },
    [revealDirection]
  );

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      computeOrder(text.length);
      setRevealedIndices(new Set());
    } else {
      setRevealedIndices(new Set());
    }
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length]);

  useEffect(() => {
    if (!isAnimating) return;

    let currentIteration = 0;
    const orderArr = computeOrder(text.length);
    let pointer = 0;

    const getNextIndex = (revealedSet: Set<number>): number => {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start': return revealedSet.size;
        case 'end': return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) return nextIndex;
          for (let i = 0; i < textLength; i++) if (!revealedSet.has(i)) return i;
          return 0;
        }
        default: return revealedSet.size;
      }
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices(prevRevealed => {
        if (sequential) {
          if (direction === 'forward') {
            if (prevRevealed.size < text.length) {
              const nextIndex = orderArr[pointer++] ?? getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            } else {
              clearInterval(intervalRef.current ?? undefined);
              setIsAnimating(false);
              setIsDecrypted(true);
              return prevRevealed;
            }
          }
        } else {
          setDisplayText(shuffleText(text, prevRevealed));
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(intervalRef.current ?? undefined);
            setIsAnimating(false);
            setDisplayText(text);
            setIsDecrypted(true);
          }
          return prevRevealed;
        }
        return prevRevealed;
      });
    }, speed);

    return () => clearInterval(intervalRef.current ?? undefined);
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText, direction, computeOrder]);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerDecrypt();
            setHasAnimated(true);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === 'click') {
      setRevealedIndices(new Set());
      setDisplayText(shuffleText(text, new Set()));
      setIsDecrypted(false);
    } else {
      setDisplayText(text);
      setIsDecrypted(true);
    }
    setRevealedIndices(new Set());
  }, [animateOn, text, shuffleText]);

  const animateProps =
    animateOn === 'hover' || animateOn === 'inViewHover'
      ? { onMouseEnter: triggerDecrypt }
      : animateOn === 'click'
        ? { onClick: triggerDecrypt }
        : {};

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...animateProps}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
