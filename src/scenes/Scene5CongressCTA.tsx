import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HeaderBadge } from "../components/HeaderBadge";
import { KineticCaption, KineticPhrase } from "../components/KineticCaption";
import { profCarliImage } from "../assets/profcarliBase64";

export const Scene5CongressCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heavy "Emendas" block drops onto balance scale (frame 40 to 90)
  const heavyBlockDrop = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 10, mass: 2.8, stiffness: 200 },
  });

  const heavyBlockY = interpolate(heavyBlockDrop, [0, 1], [-300, 0]);

  // Balance scale beam tilt (-22 deg when heavy block lands)
  const beamTilt = interpolate(heavyBlockDrop, [0, 1], [0, -22]);

  // Lighter education blocks catapulted into air (starts frame 80)
  const launchProgress = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 120 },
  });

  const launchedY = interpolate(launchProgress, [0, 1], [0, -320]);
  const launchedSpread = interpolate(launchProgress, [0, 1], [0, 80]);

  // Morph into Instagram CTA & Prof Carli profile card (frames 180 to 280)
  const ctaCardScale = spring({
    frame: Math.max(0, frame - 180),
    fps,
    config: { damping: 12, mass: 0.9, stiffness: 140 },
  });

  // Loop back background opacity transition towards the end (frame 520 to 600)
  const loopTransition = interpolate(frame, [520, 600], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captions: KineticPhrase[] = [
    {
      startFrame: 0,
      durationInFrames: 100,
      words: [
        "ENQUANTO ISSO:",
        { text: "R$ 44,8 BILHÕES", color: "#F59E0B", isHighlighted: true },
        "EM EMENDAS.",
      ],
    },
    {
      startFrame: 100,
      durationInFrames: 110,
      words: [
        "A CONTA",
        "SOBRA",
        "PARA A",
        { text: "EDUCAÇÃO PÚBLICA!", color: "#EF4444", isHighlighted: true },
      ],
    },
    {
      startFrame: 210,
      durationInFrames: 170,
      words: [
        { text: "O CONGRESSO AINDA VAI VOTAR.", color: "#38BDF8" },
        { text: "QUEM PAGA A CONTA?", color: "#F59E0B", isHighlighted: true },
      ],
    },
    {
      startFrame: 380,
      durationInFrames: 220,
      words: [
        { text: "SALVE,", color: "#38BDF8" },
        { text: "COMENTE", color: "#F59E0B" },
        "E",
        { text: "COMPARTILHE!", color: "#EF4444", isHighlighted: true },
      ],
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
        fontFamily: "system-ui, -apple-system, 'Montserrat', 'Inter', sans-serif",
      }}
    >
      <HeaderBadge category="CONGRESSO & DECISÃO" year="2027" />

      {/* Seamless loop overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#0F172A",
          opacity: loopTransition,
          pointerEvents: "none",
          zIndex: 90,
        }}
      />

      {/* Balance Scale & Blocks Area (Visible during first half: frames 0 to 220) */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 60,
          right: 60,
          height: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: interpolate(frame, [180, 240], [1, 0.25], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {/* Scale Fulcrum & Beam */}
        <div
          style={{
            width: 780,
            height: 16,
            backgroundColor: "#94A3B8",
            borderRadius: 8,
            transform: `rotate(${beamTilt}deg)`,
            transformOrigin: "center center",
            boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
            position: "relative",
            marginTop: 180,
          }}
        >
          {/* Heavy Block Left: Emendas Parlamentares */}
          <div
            style={{
              position: "absolute",
              left: 20,
              bottom: 24,
              transform: `translateY(${heavyBlockY}px)`,
              backgroundColor: "#1E293B",
              border: "4px solid #F59E0B",
              borderRadius: 20,
              padding: "16px 20px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
              textAlign: "center",
              width: 250,
            }}
          >
            <div style={{ color: "#F59E0B", fontSize: 16, fontWeight: 800 }}>
              EMENDAS PARLAMENTARES
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900 }}>
              R$ 44,8 BI
            </div>
            <div style={{ fontSize: 24 }}>⚖️ 🏛️</div>
          </div>

          {/* Lighter Blocks Right: Educação catapulted upwards */}
          <div
            style={{
              position: "absolute",
              right: 20,
              bottom: 24,
              transform: `translateY(${launchedY}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#7F1D1D",
                border: "3px solid #EF4444",
                borderRadius: 14,
                padding: "8px 16px",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 800,
                transform: `translateX(${launchedSpread}px)`,
              }}
            >
              Universidades
            </div>
            <div
              style={{
                backgroundColor: "#7F1D1D",
                border: "3px solid #EF4444",
                borderRadius: 14,
                padding: "8px 16px",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 800,
                transform: `translateX(-${launchedSpread}px)`,
              }}
            >
              CAPES / CNPq
            </div>
            <div
              style={{
                backgroundColor: "#7F1D1D",
                border: "3px solid #EF4444",
                borderRadius: 14,
                padding: "8px 16px",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              Escola Básica
            </div>
          </div>
        </div>

        {/* Scale Base Triangle */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "40px solid transparent",
            borderRight: "40px solid transparent",
            borderBottom: "70px solid #475569",
            marginTop: -6,
          }}
        />
      </div>

      {/* Center CTA Card with Prof Carli Profile (Pop-in after frame 180) */}
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 60,
          right: 60,
          transform: `scale(${ctaCardScale})`,
          zIndex: 80,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "4px solid #F59E0B",
            borderRadius: 36,
            padding: "44px 36px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Avatar Image */}
          <div style={{ position: "relative" }}>
            <img
              src={profCarliImage}
              alt="Profª Carli"
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #F59E0B",
                boxShadow: "0 10px 30px rgba(245, 158, 11, 0.4)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                backgroundColor: "#38BDF8",
                color: "white",
                borderRadius: "50%",
                width: 34,
                height: 34,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 18,
                fontWeight: 900,
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              ✓
            </div>
          </div>

          <h2
            style={{
              color: "#F8FAFC",
              fontSize: 36,
              fontWeight: 900,
              margin: "18px 0 6px 0",
              letterSpacing: "-0.5px",
            }}
          >
            Profª Carli
          </h2>
          <div
            style={{
              color: "#F59E0B",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "0.5px",
            }}
          >
            @profcarli
          </div>

          <p
            style={{
              color: "#CBD5E1",
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1.4,
              margin: "20px 0 28px 0",
              maxWidth: 720,
            }}
          >
            Defenda a Educação Pública, a Ciência e o Futuro do nosso país.
          </p>

          {/* Social Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                border: "2px solid #38BDF8",
                color: "#38BDF8",
                borderRadius: 20,
                padding: "14px 12px",
                fontWeight: 900,
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              💬 COMENTE
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                border: "2px solid #F59E0B",
                color: "#F59E0B",
                borderRadius: 20,
                padding: "14px 12px",
                fontWeight: 900,
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              ↗️ COMPARTILHE
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                border: "2px solid #EF4444",
                color: "#EF4444",
                borderRadius: 20,
                padding: "14px 12px",
                fontWeight: 900,
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              🔖 SALVE
            </div>
          </div>
        </div>
      </div>

      {/* Brazilian National Congress Silhouette at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        <svg width="680" height="180" viewBox="0 0 400 120" fill="#475569">
          {/* Twin Towers */}
          <rect x="175" y="10" width="22" height="95" rx="3" />
          <rect x="203" y="10" width="22" height="95" rx="3" />
          {/* Skybridge */}
          <rect x="195" y="45" width="10" height="15" />
          {/* Base slab */}
          <rect x="40" y="90" width="320" height="20" rx="4" />
          {/* Left Dome (Chamber - convex) */}
          <path d="M 90 90 A 45 35 0 0 1 170 90 Z" />
          {/* Right Dome (Senate - concave dish) */}
          <path d="M 230 75 Q 270 105 310 75 Z" />
        </svg>
      </div>

      <KineticCaption phrases={captions} currentFrame={frame} />
    </div>
  );
};
