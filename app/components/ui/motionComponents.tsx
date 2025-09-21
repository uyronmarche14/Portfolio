import React from 'react';
import {
  motion,
  AnimatePresence,
  type Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition
} from 'framer-motion';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface MotionComponentsProps {
  texts: string[];
  currentTextIndex: number;
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: 'sync' | 'wait';
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  className?: string;
  elements: Array<{
    characters: string[];
    needsSpace: boolean;
  }>;
  getStaggerDelay: (index: number, totalChars: number) => number;
  splitBy?: string;
}

const MotionComponents: React.FC<MotionComponentsProps> = ({
  texts,
  currentTextIndex,
  transition = { type: 'spring', damping: 25, stiffness: 300 },
  initial = { y: '100%', opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: '-120%', opacity: 0 },
  animatePresenceMode = 'wait',
  animatePresenceInitial = false,
  staggerDuration = 0,
  staggerFrom = 'first',
  mainClassName,
  splitLevelClassName,
  elementLevelClassName,
  className,
  elements,
  getStaggerDelay,
  splitBy = 'characters',
  ...rest
}) => {
  return (
    <motion.span
      className={cn('flex flex-wrap whitespace-pre-wrap relative', mainClassName, className)}
      {...rest}
      layout
      transition={transition}
    >
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={cn(splitBy === 'lines' ? 'flex flex-col w-full' : 'flex flex-wrap whitespace-pre-wrap relative')}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span key={wordIndex} className={cn('inline-flex', splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce((sum, word) => sum + word.characters.length, 0)
                      )
                    }}
                    className={cn('inline-block', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};

export default MotionComponents;