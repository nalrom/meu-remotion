import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface WordHighlight {
  text: string;
  color?: string; // e.g. '#F59E0B' (gold), '#EF4444' (red), '#38BDF8'
  isHighlighted?: boolean;
}

export interface KineticPhrase {
  words: (string | WordHighlight)[];
  startFrame: number;
  durationInFrames: number;
}

interface KineticCaptionProps {
  phrases: KineticPhrase[];
  currentFrame: number;
  bottomOffset?: number;
}

export const KineticCaption: React.FC<KineticCaptionProps> = ({
  phrases,
  currentFrame,
  bottomOffset = 460, // Above the 420px Instagram Reels bottom safe zone
}) => {
  const { fps } = useVideoConfig();

  // Find active phrase
  const activePhrase = phrases.find(
    (p) =>
      currentFrame >= p.startFrame &&
      currentFrame < p.startFrame + p.durationInFrames
  );

  if (!activePhrase) return null;

  const phraseLocalFrame = currentFrame - activePhrase.startFrame;

  // Spring pop-in with overshoot
  const scale = spring({
    frame: phraseLocalFrame,
    fps,
    config: {
      damping: 10,
      mass: 0.6,
      stiffness: 180,
      overshootClamping: false,
    },
  });

  const opacity = interpolate(phraseLocalFrame, [0, 4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: 50,
        right: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          backdropFilter: "blur(12px)",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          padding: "16px 28px",
          borderRadius: 24,
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          maxWidth: 960,
          textAlign: "center",
        }}
      >
        {activePhrase.words.map((item, index) => {
          const isObj = typeof item !== "string";
          const text = isObj ? item.text : item;
          const color = isObj && item.color ? item.color : "#FFFFFF";
          const isHigh = isObj && item.isHighlighted;

          return (
            <span
              key={index}
              style={{
                fontFamily:
                  "system-ui, -apple-system, 'Montserrat', 'Inter', sans-serif",
                fontSize: 34,
                fontWeight: 900,
                color,
                letterSpacing: "-0.5px",
                position: "relative",
                display: "inline-block",
                backgroundColor: isHigh ? "rgba(239, 68, 68, 0.25)" : "transparent",
                padding: isHigh ? "2px 10px" : "0",
                borderRadius: isHigh ? 8 : 0,
                borderBottom: isHigh ? "3px solid #EF4444" : "none",
              }}
            >
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
