import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HeaderBadge } from "../components/HeaderBadge";
import { KineticCaption, KineticPhrase } from "../components/KineticCaption";

export const Scene3Capes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Red guillotine/curtain drops from top to cover half the student grid (frame 50 to 120)
  const redCurtainY = interpolate(frame, [50, 110], [-500, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stamp drop with heavy screen shake (impact at frame 170)
  const stampProgress = spring({
    frame: Math.max(0, frame - 140),
    fps,
    config: { damping: 10, mass: 2.2, stiffness: 220 },
  });

  const stampY = interpolate(stampProgress, [0, 1], [-400, 0]);

  // Screen shake on stamp impact (frames 160-200)
  const isShaking = frame >= 160 && frame <= 200;
  const shakeX = isShaking ? Math.sin((frame - 160) * 1.5) * 14 : 0;
  const shakeY = isShaking ? Math.cos((frame - 160) * 1.8) * 12 : 0;

  // Countdown down to -181 MIL BOLSAS (frames 210 to 320)
  const bolsasCount = Math.round(
    interpolate(frame, [210, 320], [0, -181], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Student grid: 6 rows of 6 = 36 students
  const totalStudents = 36;
  const cutOffThreshold = 18; // Half are wiped out

  const captions: KineticPhrase[] = [
    {
      startFrame: 0,
      durationInFrames: 110,
      words: [
        { text: "CAPES:", color: "#38BDF8", isHighlighted: true },
        { text: "-10,2%", color: "#EF4444" },
        "NO",
        "ORÇAMENTO",
        "DA",
        "CIÊNCIA.",
      ],
    },
    {
      startFrame: 110,
      durationInFrames: 130,
      words: [
        { text: "-R$ 424,6 MILHÕES", color: "#EF4444", isHighlighted: true },
        "A",
        "MENOS",
        "DE",
        "UMA",
        "VEZ!",
      ],
    },
    {
      startFrame: 240,
      durationInFrames: 140,
      words: [
        { text: "QUASE 182 MIL", color: "#F59E0B", isHighlighted: true },
        { text: "BOLSAS CORTADAS", color: "#EF4444" },
        "NA PÓS E EDUCAÇÃO BÁSICA.",
      ],
    },
    {
      startFrame: 380,
      durationInFrames: 100,
      words: [
        "O",
        { text: "FUTURO DA PESQUISA", color: "#38BDF8" },
        "EM",
        { text: "RISCO REAL.", color: "#EF4444" },
      ],
    },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#0B1329",
        position: "relative",
        overflow: "hidden",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        fontFamily: "system-ui, -apple-system, 'Montserrat', 'Inter', sans-serif",
      }}
    >
      <HeaderBadge category="CIÊNCIA & PÓS" year="CAPES" />

      {/* Main Science Icons (Capelo & Microscópio) */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 24,
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              border: "2px solid #38BDF8",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 44,
            }}
          >
            🎓
          </div>
          <div>
            <div style={{ color: "#38BDF8", fontSize: 28, fontWeight: 900 }}>
              CAPES / CNPq
            </div>
            <div style={{ color: "#94A3B8", fontSize: 18, fontWeight: 600 }}>
              Pós-Graduação & Formação Docente
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#EF4444",
            color: "white",
            padding: "8px 20px",
            borderRadius: 20,
            fontSize: 26,
            fontWeight: 900,
            boxShadow: "0 0 25px rgba(239, 68, 68, 0.6)",
          }}
        >
          -10,2%
        </div>
      </div>

      {/* Heavy Stamp / Cut Announcement */}
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 60,
          right: 60,
          transform: `translateY(${stampY}px)`,
          zIndex: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "#7F1D1D",
            border: "4px solid #EF4444",
            borderRadius: 28,
            padding: "24px 30px",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                color: "#FCA5A5",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              CORTE DIRETO NO MEC
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: "-1px",
              }}
            >
              -R$ 424,6 <span style={{ color: "#EF4444" }}>MILHÕES</span>
            </div>
          </div>
          <div style={{ fontSize: 56 }}>⚠️</div>
        </div>
      </div>

      {/* Students / Researchers Grid */}
      <div
        style={{
          position: "absolute",
          top: 680,
          left: 70,
          right: 70,
          height: 480,
          backgroundColor: "rgba(15, 23, 42, 0.7)",
          borderRadius: 32,
          border: "2px solid rgba(255, 255, 255, 0.08)",
          padding: "36px 30px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#94A3B8", fontSize: 18, fontWeight: 700 }}>
            REDE DE BOLSISTAS E PESQUISADORES:
          </span>
          <span
            style={{
              color: frame > 110 ? "#EF4444" : "#10B981",
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            {frame > 110 ? "50% DESATIVADOS" : "ATIVOS"}
          </span>
        </div>

        {/* 6x6 Grid of Student Icons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 20,
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          {Array.from({ length: totalStudents }).map((_, idx) => {
            const isCutOff = idx >= cutOffThreshold;
            const isAffected = isCutOff && frame > 90;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: isAffected ? 0.2 : 0.95,
                  transform: isAffected ? "scale(0.8)" : "scale(1)",
                  transition: "all 0.2s ease-out",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: 38 }}>🧑‍🎓</div>
                {isAffected && (
                  <div
                    style={{
                      position: "absolute",
                      top: 4,
                      color: "#EF4444",
                      fontSize: 32,
                      fontWeight: 900,
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sliding Guillotine Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: redCurtainY,
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            borderTop: "3px dashed #EF4444",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Bolsas Countdown Counter */}
      <div
        style={{
          position: "absolute",
          top: 1200,
          left: 60,
          right: 60,
          textAlign: "center",
          backgroundColor: "#1E293B",
          border: "3px solid #F59E0B",
          borderRadius: 24,
          padding: "20px 24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ color: "#FCD34D", fontSize: 20, fontWeight: 800 }}>
          IMPACTO DIRETO ESTIMADO:
        </div>
        <div
          style={{
            color: "#EF4444",
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "-1px",
            marginTop: 4,
          }}
        >
          {bolsasCount} MIL
        </div>
        <div style={{ color: "#F8FAFC", fontSize: 22, fontWeight: 700 }}>
          bolsas a menos na graduação, pós e formação de professores
        </div>
      </div>

      <KineticCaption phrases={captions} currentFrame={frame} />
    </div>
  );
};
