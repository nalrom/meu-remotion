import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface MyVideoProps {
  titleText: string;
  subtitleText: string;
}

export const MainComposition: React.FC<MyVideoProps> = ({
  titleText = "Meu Vídeo Remotion",
  subtitleText = "Renderizado gratuitamente no GitHub Actions 🚀",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animação de entrada suave com mola (spring)
  const scale = spring({
    fps,
    frame,
    config: {
      damping: 12,
    },
  });

  const opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#090d16",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "white",
        padding: "60px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "100px",
            marginBottom: "30px",
          }}
        >
          🎬
        </div>
        <h1
          style={{
            fontSize: "76px",
            fontWeight: 800,
            margin: "0 0 24px 0",
            background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}
        >
          {titleText}
        </h1>
        <p
          style={{
            fontSize: "36px",
            color: "#94a3b8",
            maxWidth: "850px",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {subtitleText}
        </p>
      </div>
    </div>
  );
};
