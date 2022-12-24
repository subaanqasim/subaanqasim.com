import { useState, useEffect, useCallback } from "react";
import { useSpring } from "@react-spring/web";
import { usePrefersReducedMotion } from "@utils/hooks";

export type BounceParams = {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
  springConfig?: {
    tension: number;
    friction: number;
  };
};

export function useBounce({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}: BounceParams = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isTouched, setIsTouched] = useState(false);

  const style = useSpring({
    backfaceVisibility: "hidden",
    transform: isTouched
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  });

  useEffect(() => {
    if (!isTouched) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsTouched(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isTouched, timing]);

  const trigger = useCallback(() => {
    setIsTouched(true);
  }, []);

  const appliedStyle = prefersReducedMotion ? {} : style;

  return { appliedStyle, trigger };
}
