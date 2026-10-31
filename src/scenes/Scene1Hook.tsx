import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HeaderBadge } from "../components/HeaderBadge";
import { KineticCaption, KineticPhrase } from "../components/KineticCaption";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scissors cut occurs at frame 100 (around ~1.7s)
  const cutFrame = 100;
  const isCut = frame >= cutFrame;
  const postCutFrame = Math.max(0, frame - cutFrame);

  // Book entrance spring
  const bookScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Scissors entrance and snip
  const scissorsX = interpolate(frame, [20, 95, 105, 130], [-350, 480, 520, 1200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scissorsRotation = interpolate(
    frame,
    [85, 98, 103, 115],
    [-25, -45, -10, -30],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Half book movements post cut
  const leftSlideX = isCut ? -interpolate(postCutFrame, [0, 80], [0, 180]) : 0;
  const leftSlideY = isCut ? interpolate(postCutFrame, [0, 80], [0, 260]) : 0;
  const leftRotate = isCut ? -interpolate(postCutFrame, [0, 80], [0, 16]) : 0;

  const rightSlideX = isCut ? interpolate(postCutFrame, [0, 80], [0, 180]) : 0;
  const rightSlideY = isCut ? interpolate(postCutFrame, [0, 80], [0, 320]) : 0;
  const rightRotate = isCut ? interpolate(postCutFrame, [0, 80], [0, 20]) : 0;

  // Camera zoom in near the end of scene (frame 240-300)
  const cameraZoom = interpolate(frame, [230, 300], [1, 1.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Coin particles bursting out of the cut (frame 100-240)
  const coinParticles = Array.from({ length: 18 }).map((_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    const speed = 240 + (i % 5) * 60;
    const progress = interpolate(postCutFrame, [0, 80], [0, 1], {
      extrapolateRight: "clamp",
    });
    const distance = progress * speed;
    const gravity = Math.pow(progress * 1.8, 2) * 450;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance + gravity - 120 * progress;
    const opacity = interpolate(postCutFrame, [0, 10, 60, 80], [0, 1, 1, 0]);
    const rot = i * 45 + postCutFrame * 12;

    return { x, y, opacity, rot, key: i };
  });

  // Kinetic phrases
  const captions: KineticPhrase[] = [
    {
      startFrame: 0,
      durationInFrames: 90,
      words: [
        { text: "CORTES", color: "#EF4444", isHighlighted: true },
        "NA",
        "EDUCAÇÃO",
        "EM",
        { text: "2027?", color: "#F59E0B" },
      ],
    },
    {
      startFrame: 100,
      durationInFrames: 120,
      words: [
        { text: "A TESOURA", color: "#EF4444", isHighlighted: true },
        "CHEGOU",
        "NO",
        { text: "ORÇAMENTO!", color: "#F59E0B" },
      ],
    },
    {
      startFrame: 220,
      durationInFrames: 80,
      words: ["ENTENDA", "O", { text: "IMPACTO REAL", color: "#EF4444" }, "AGORA!"],
    },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#0F172A",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${cameraZoom})`,
        transformOrigin: "center center",
      }}
    >
      <HeaderBadge category="ALERTA NACIONAL" year="2027" />

      {/* Background Graphic Accents */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          right: "5%",
          height: "70%",
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(239, 68, 68, 0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Central Book Area */}
      <div
        style={{
          position: "absolute",
          top: 520,
          left: "50%",
          transform: `translateX(-50%) scale(${bookScale})`,
          width: 600,
          height: 640,
        }}
      >
        {/* Left Half of Book */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 300,
            height: 640,
            transform: `translate(${leftSlideX}px, ${leftSlideY}px) rotate(${leftRotate}deg)`,
            transformOrigin: "bottom left",
            transition: "transform 0.05s linear",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#1E293B",
              border: "6px solid #38BDF8",
              borderRight: "none",
              borderRadius: "28px 0 0 28px",
              boxShadow: "-16px 20px 40px rgba(0,0,0,0.6)",
              padding: "40px 24px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 64 }}>📖</div>
            <div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: isCut ? "#EF4444" : "#F8FAFC",
                  lineHeight: 1.1,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                ORÇA-
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#38BDF8",
                  marginTop: 10,
                }}
              >
                MEC • 2027
              </div>
            </div>
            <div
              style={{
                height: 12,
                backgroundColor: "#334155",
                borderRadius: 6,
                width: "80%",
              }}
            />
          </div>
        </div>

        {/* Right Half of Book */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 300,
            width: 300,
            height: 640,
            transform: `translate(${rightSlideX}px, ${rightSlideY}px) rotate(${rightRotate}deg)`,
            transformOrigin: "bottom right",
            transition: "transform 0.05s linear",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#1E293B",
              border: "6px solid #38BDF8",
              borderLeft: isCut ? "4px dashed #EF4444" : "none",
              borderRadius: "0 28px 28px 0",
              boxShadow: "16px 20px 40px rgba(0,0,0,0.6)",
              padding: "40px 24px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ textAlign: "right", fontSize: 64 }}>⚖️</div>
            <div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: isCut ? "#EF4444" : "#F8FAFC",
                  lineHeight: 1.1,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                MENTO
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#F59E0B",
                  marginTop: 10,
                }}
              >
                BRASIL
              </div>
            </div>
            <div
              style={{
                height: 12,
                backgroundColor: "#334155",
                borderRadius: 6,
                width: "70%",
                alignSelf: "flex-end",
              }}
            />
          </div>
        </div>

        {/* Coin Explosion Particles */}
        {isCut &&
          coinParticles.map((c) => (
            <div
              key={c.key}
              style={{
                position: "absolute",
                top: 320,
                left: 300,
                transform: `translate(${c.x}px, ${c.y}px) rotate(${c.rot}deg)`,
                opacity: c.opacity,
                fontSize: 38,
                pointerEvents: "none",
                filter: "drop-shadow(0 4px 10px rgba(245, 158, 11, 0.8))",
              }}
            >
              💰
            </div>
          ))}

        {/* Scissors Cut Vector */}
        <div
          style={{
            position: "absolute",
            top: 220,
            left: scissorsX,
            transform: `rotate(${scissorsRotation}deg)`,
            zIndex: 40,
            pointerEvents: "none",
            filter: "drop-shadow(10px 15px 20px rgba(0,0,0,0.7))",
          }}
        >
          <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
            {/* Scissor Handles & Blades in collage style */}
            <circle cx="25" cy="30" r="14" stroke="#CBD5E1" strokeWidth="6" fill="#475569" />
            <circle cx="25" cy="70" r="14" stroke="#CBD5E1" strokeWidth="6" fill="#475569" />
            <path d="M35 34 L78 68 L72 74 L32 40 Z" fill="#E2E8F0" />
            <path d="M35 66 L86 28 L92 34 L32 60 Z" fill="#F8FAFC" />
            <circle cx="52" cy="50" r="4" fill="#EF4444" />
          </svg>
        </div>
      </div>

      <KineticCaption phrases={captions} currentFrame={frame} />
    </div>
  );
};
