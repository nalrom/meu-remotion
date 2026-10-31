import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HeaderBadge } from "../components/HeaderBadge";
import { KineticCaption, KineticPhrase } from "../components/KineticCaption";

export const Scene2Illusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Expansion of the bottom reality section: starts around frame 200 (around ~3.3s into scene)
  const expandProgress = spring({
    frame: Math.max(0, frame - 200),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Top height goes from 50% to ~15% or 0%
  const topHeight = interpolate(expandProgress, [0, 1], [960, 240]);
  const bottomHeight = 1920 - topHeight;

  // Odometer value counter: counts up from 0 to 141.2
  const countValue = interpolate(frame, [15, 120], [0, 141.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bar chart heights
  const bar1 = interpolate(frame, [10, 80], [0, 260], { extrapolateRight: "clamp" });
  const bar2 = interpolate(frame, [25, 95], [0, 340], { extrapolateRight: "clamp" });
  const bar3 = interpolate(frame, [40, 110], [0, 440], { extrapolateRight: "clamp" });

  // Magnifying glass movement (left-right scan then zoom)
  const glassX = interpolate(frame, [40, 160, 240, 340], [250, 780, 540, 540], {
    extrapolateRight: "clamp",
  });
  const glassY = interpolate(frame, [40, 160, 240, 340], [1300, 1260, 1220, 1140], {
    extrapolateRight: "clamp",
  });
  const glassScale = interpolate(frame, [200, 320], [1, 1.35], {
    extrapolateRight: "clamp",
  });

  // Desk shrinking under the magnifying glass
  const deskScale = interpolate(frame, [210, 340], [1, 0.62], {
    extrapolateRight: "clamp",
  });

  const captions: KineticPhrase[] = [
    {
      startFrame: 0,
      durationInFrames: 110,
      words: [
        "NO",
        { text: "PAPEL:", color: "#14B8A6" },
        "O",
        { text: "PISO CONSTITUCIONAL", color: "#F59E0B" },
        "É CUMPRIDO.",
      ],
    },
    {
      startFrame: 110,
      durationInFrames: 110,
      words: [
        { text: "R$ 141,2 BILHÕES", color: "#38BDF8", isHighlighted: true },
        "NOMINAIS",
        "APROVADOS.",
      ],
    },
    {
      startFrame: 220,
      durationInFrames: 120,
      words: [
        "MAS",
        { text: "NA PRÁTICA:", color: "#EF4444", isHighlighted: true },
        "A",
        { text: "INFLAÇÃO", color: "#F59E0B" },
        "ENGOLIU O VALOR!",
      ],
    },
    {
      startFrame: 340,
      durationInFrames: 80,
      words: [
        { text: "PERDA REAL", color: "#EF4444", isHighlighted: true },
        "NAS ESCOLAS E LABORATÓRIOS.",
      ],
    },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: "relative",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, 'Montserrat', 'Inter', sans-serif",
      }}
    >
      <HeaderBadge category="PISO VS REALIDADE" year="2027" />

      {/* Top Half: Illusion / Paper Budget (Teal / Cyan theme) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: topHeight,
          backgroundColor: "#064E3B",
          backgroundImage:
            "linear-gradient(180deg, #064E3B 0%, #065F46 60%, #047857 100%)",
          overflow: "hidden",
          borderBottom: "6px solid #10B981",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 320,
            left: 60,
            right: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#A7F3D0",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              📄 Orçamento Nominal Declarado
            </div>
            <div
              style={{
                fontSize: 66,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-1px",
                marginTop: 6,
              }}
            >
              R$ {countValue.toFixed(1)}{" "}
              <span style={{ fontSize: 36, color: "#F59E0B" }}>BI</span>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(16, 185, 129, 0.3)",
                color: "#6EE7B7",
                padding: "6px 14px",
                borderRadius: 16,
                fontSize: 18,
                fontWeight: 800,
                marginTop: 10,
              }}
            >
              ✓ PISO ATINGIDO NO PAPEL
            </div>
          </div>

          {/* Bar Chart Graphic */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 20,
              height: 440,
            }}
          >
            <div
              style={{
                width: 44,
                height: bar1,
                backgroundColor: "#34D399",
                borderRadius: "12px 12px 0 0",
                boxShadow: "0 0 20px rgba(52, 211, 153, 0.4)",
              }}
            />
            <div
              style={{
                width: 44,
                height: bar2,
                backgroundColor: "#10B981",
                borderRadius: "12px 12px 0 0",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
              }}
            />
            <div
              style={{
                width: 54,
                height: bar3,
                backgroundColor: "#F59E0B",
                borderRadius: "12px 12px 0 0",
                boxShadow: "0 0 25px rgba(245, 158, 11, 0.5)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Half: Harsh Reality (Dark Red / Alert theme) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 1080,
          height: bottomHeight,
          backgroundColor: "#450A0A",
          backgroundImage:
            "linear-gradient(180deg, #7F1D1D 0%, #450A0A 80%)",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            right: 60,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: "#FCA5A5",
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>🔍 NA PRÁTICA: CORROSÃO REAL</span>
          </div>

          {/* Grid of vulnerable educational elements */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            {/* School Lab Item */}
            <div
              style={{
                textAlign: "center",
                opacity: 0.6,
                transform: "scale(0.85)",
              }}
            >
              <div style={{ fontSize: 72 }}>🔬</div>
              <div style={{ color: "#FECACA", fontWeight: 700, fontSize: 20 }}>
                Laboratórios
              </div>
              <div style={{ color: "#EF4444", fontWeight: 900, fontSize: 18 }}>
                -12% Verbas
              </div>
            </div>

            {/* Target Desk (zoomed and shrinking) */}
            <div
              style={{
                textAlign: "center",
                transform: `scale(${deskScale})`,
                transition: "transform 0.1s ease-out",
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "24px 36px",
                borderRadius: 24,
                border: "3px dashed #EF4444",
              }}
            >
              <div style={{ fontSize: 96 }}>🪑</div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontSize: 26,
                  marginTop: 8,
                }}
              >
                Carteira Escolar
              </div>
              <div
                style={{
                  color: "#F87171",
                  fontWeight: 900,
                  fontSize: 22,
                  marginTop: 4,
                }}
              >
                Poder de compra corroído!
              </div>
            </div>

            {/* School Building Item */}
            <div
              style={{
                textAlign: "center",
                opacity: 0.6,
                transform: "scale(0.85)",
              }}
            >
              <div style={{ fontSize: 72 }}>🏫</div>
              <div style={{ color: "#FECACA", fontWeight: 700, fontSize: 20 }}>
                Manutenção
              </div>
              <div style={{ color: "#EF4444", fontWeight: 900, fontSize: 18 }}>
                Rachaduras
              </div>
            </div>
          </div>
        </div>

        {/* Magnifying Glass Overlay */}
        <div
          style={{
            position: "absolute",
            top: glassY - (1920 - bottomHeight),
            left: glassX,
            transform: `scale(${glassScale}) translate(-50%, -50%)`,
            zIndex: 60,
            pointerEvents: "none",
            filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.8))",
          }}
        >
          <svg width="240" height="240" viewBox="0 0 100 100">
            <circle
              cx="45"
              cy="45"
              r="34"
              stroke="#E2E8F0"
              strokeWidth="8"
              fill="rgba(255, 255, 255, 0.1)"
            />
            <line
              x1="68"
              y1="68"
              x2="94"
              y2="94"
              stroke="#94A3B8"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Red alert glare inside glass */}
            <path
              d="M30 35 Q45 25 60 35"
              stroke="#EF4444"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <KineticCaption phrases={captions} currentFrame={frame} />
    </div>
  );
};
