import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HeaderBadge } from "../components/HeaderBadge";
import { KineticCaption, KineticPhrase } from "../components/KineticCaption";

export const Scene4Municipalities: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Carousel horizontal pan:
  // Phase 1: Bus (frame 0-190) -> panX ~ 0
  // Phase 2: School (frame 190-390) -> panX slides left to show school (-1080)
  // Phase 3: Lunch plate (frame 390-600) -> panX slides left to show plate (-2160)
  const panTransition1 = spring({
    frame: Math.max(0, frame - 170),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const panTransition2 = spring({
    frame: Math.max(0, frame - 370),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const carouselX =
    -interpolate(panTransition1, [0, 1], [0, 1080]) -
    interpolate(panTransition2, [0, 1], [0, 1080]);

  // Phase 1: Bus movement and road tilting down by -17%
  const busX = interpolate(frame, [0, 160], [100, 380], {
    extrapolateRight: "clamp",
  });
  const busTilt = interpolate(frame, [60, 140], [0, 17], {
    extrapolateRight: "clamp",
  });

  // Phase 2: School coin dropping and building shrinking by -9%
  const schoolCoinY = interpolate(frame, [200, 270], [-200, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const schoolScale = interpolate(frame, [240, 330], [1, 0.91], {
    extrapolateRight: "clamp",
  });

  // Phase 3: Food plate pie slice disappearance of -6%
  const pieSliceOpacity = interpolate(frame, [410, 480], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pieSliceScale = interpolate(frame, [410, 480], [1, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captions: KineticPhrase[] = [
    {
      startFrame: 0,
      durationInFrames: 80,
      words: ["NAS", { text: "CIDADES:", color: "#38BDF8" }, "O CORTE", "ATINGE A PONTA."],
    },
    {
      startFrame: 80,
      durationInFrames: 110,
      words: [
        { text: "TRANSPORTE ESCOLAR:", color: "#F59E0B" },
        { text: "-17%", color: "#EF4444", isHighlighted: true },
        "NA ROTA DOS ALUNOS.",
      ],
    },
    {
      startFrame: 190,
      durationInFrames: 190,
      words: [
        { text: "DINHEIRO NA ESCOLA (PDDE):", color: "#F59E0B" },
        { text: "-9%", color: "#EF4444", isHighlighted: true },
        "A MENOS PARA MANUTENÇÃO.",
      ],
    },
    {
      startFrame: 380,
      durationInFrames: 220,
      words: [
        { text: "MERENDA ESCOLAR (PNAE):", color: "#F59E0B" },
        { text: "-6%", color: "#EF4444", isHighlighted: true },
        "MENOS COMIDA NO PRATO!",
      ],
    },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#0A0F1D",
        position: "relative",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, 'Montserrat', 'Inter', sans-serif",
      }}
    >
      <HeaderBadge category="EDUCAÇÃO BÁSICA" year="MUNICÍPIOS" />

      {/* Dynamic 3-Card Carousel Track */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          width: 3240, // 3 x 1080
          height: 840,
          display: "flex",
          transform: `translateX(${carouselX}px)`,
          transition: "transform 0.05s linear",
        }}
      >
        {/* CARD 1: ÔNIBUS ESCOLAR (-17%) */}
        <div
          style={{
            width: 1080,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              border: "3px solid #F59E0B",
              borderRadius: 36,
              width: "100%",
              height: 720,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "48px 36px",
              boxSizing: "border-box",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Title & Tag */}
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#94A3B8", fontSize: 22, fontWeight: 800 }}>
                TRANSPORTE ESCOLAR
              </div>
              <div
                style={{
                  color: "#EF4444",
                  fontSize: 72,
                  fontWeight: 900,
                  marginTop: 6,
                }}
              >
                -17%
              </div>
              <div style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700 }}>
                Redução de rotas e combustível
              </div>
            </div>

            {/* Road & Bus Animation */}
            <div
              style={{
                width: "100%",
                height: 300,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Slanted Road */}
              <div
                style={{
                  width: "100%",
                  height: 18,
                  backgroundColor: "#475569",
                  borderRadius: 9,
                  transform: `rotate(${busTilt}deg)`,
                  position: "relative",
                  borderBottom: "4px dashed #CBD5E1",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                }}
              />

              {/* School Bus */}
              <div
                style={{
                  position: "absolute",
                  left: busX,
                  top: 80,
                  transform: `rotate(${busTilt}deg)`,
                  filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.5))",
                }}
              >
                <div style={{ fontSize: 110 }}>🚌</div>
              </div>

              {/* Angle Indicator */}
              {busTilt > 5 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: 40,
                    backgroundColor: "#EF4444",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: 14,
                    fontSize: 20,
                    fontWeight: 900,
                  }}
                >
                  📉 INCLINAÇÃO: -17%
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CARD 2: ESCOLA E PDDE (-9%) */}
        <div
          style={{
            width: 1080,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              border: "3px solid #38BDF8",
              borderRadius: 36,
              width: "100%",
              height: 720,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "48px 36px",
              boxSizing: "border-box",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#94A3B8", fontSize: 22, fontWeight: 800 }}>
                PROGRAMA DINHEIRO DIRETO NA ESCOLA
              </div>
              <div
                style={{
                  color: "#EF4444",
                  fontSize: 72,
                  fontWeight: 900,
                  marginTop: 6,
                }}
              >
                -9%
              </div>
              <div style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700 }}>
                Menos verba para reformas e material
              </div>
            </div>

            {/* School Building Animation */}
            <div
              style={{
                width: "100%",
                height: 320,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Falling Coin */}
              <div
                style={{
                  position: "absolute",
                  top: schoolCoinY,
                  fontSize: 54,
                  filter: "drop-shadow(0 8px 15px rgba(245, 158, 11, 0.7))",
                }}
              >
                🪙
              </div>

              {/* Shrinking School Building */}
              <div
                style={{
                  transform: `scale(${schoolScale})`,
                  transition: "transform 0.1s ease-out",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 130 }}>🏫</div>
                <div
                  style={{
                    backgroundColor: "#EF4444",
                    color: "white",
                    padding: "6px 18px",
                    borderRadius: 12,
                    fontSize: 20,
                    fontWeight: 900,
                    marginTop: 4,
                  }}
                >
                  ENCOLHIMENTO DE -9%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: MERENDA ESCOLAR - PNAE (-6%) */}
        <div
          style={{
            width: 1080,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              border: "3px solid #10B981",
              borderRadius: 36,
              width: "100%",
              height: 720,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "48px 36px",
              boxSizing: "border-box",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#94A3B8", fontSize: 22, fontWeight: 800 }}>
                ALIMENTAÇÃO ESCOLAR (PNAE)
              </div>
              <div
                style={{
                  color: "#EF4444",
                  fontSize: 72,
                  fontWeight: 900,
                  marginTop: 6,
                }}
              >
                -6%
              </div>
              <div style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700 }}>
                Falta de reajuste afeta qualidade do prato
              </div>
            </div>

            {/* School Lunch Plate (Top-down view) */}
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: "50%",
                backgroundColor: "#F8FAFC",
                border: "12px solid #E2E8F0",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Healthy Food Elements */}
              <div style={{ fontSize: 72 }}>🥗 🍎</div>

              {/* Vanishing Pie Cut / Cutout Slice */}
              <div
                style={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  opacity: pieSliceOpacity,
                  transform: `scale(${pieSliceScale})`,
                  backgroundColor: "#EF4444",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: 14,
                  fontSize: 18,
                  fontWeight: 900,
                  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.7)",
                }}
              >
                -6% MERENDA
              </div>
            </div>
          </div>
        </div>
      </div>

      <KineticCaption phrases={captions} currentFrame={frame} />
    </div>
  );
};
