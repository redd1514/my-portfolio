// Adapted from Aceternity UI "Stars Background": drops the `cn` dependency and
// adds a `starColor` prop ("r, g, b") so the stars work on light backgrounds.
import React, { useCallback, useEffect, useRef, useState } from "react";

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  starColor?: string;
  className?: string;
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  starColor = "255, 255, 255",
  className,
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateStars = useCallback(
    (width: number, height: number): StarProps[] => {
      const numStars = Math.floor(width * height * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.05 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
        };
      });
    },
    [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const updateStars = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      setStars(generateStars(width, height));
    };

    updateStars();

    const resizeObserver = new ResizeObserver(updateStars);
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [generateStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${star.opacity})`;
        ctx.fill();

        if (star.twinkleSpeed !== null) {
          star.opacity =
            0.5 + Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [stars, starColor]);

  return (
    <canvas
      ref={canvasRef}
      className={["absolute inset-0 h-full w-full", className].filter(Boolean).join(" ")}
    />
  );
};

export default StarsBackground;
