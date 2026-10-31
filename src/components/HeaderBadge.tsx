import React from "react";
import { profCarliImage } from "../assets/profcarliBase64";

interface HeaderBadgeProps {
  category?: string;
  year?: string;
}

export const HeaderBadge: React.FC<HeaderBadgeProps> = ({
  category = "EDUCAÇÃO",
  year = "2027",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 60,
        right: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 50,
        fontFamily: "system-ui, -apple-system, 'Montserrat', 'Inter', sans-serif",
      }}
    >
      {/* Profile Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(8px)",
          padding: "8px 18px 8px 10px",
          borderRadius: 40,
          border: "2px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <img
          src={profCarliImage}
          alt="Prof Carli"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #F59E0B",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#F8FAFC",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.5px",
            }}
          >
            @profcarli
          </span>
          <span
            style={{
              color: "#94A3B8",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Profª Carli
          </span>
        </div>
      </div>

      {/* Alert Tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          padding: "10px 20px",
          borderRadius: 30,
          fontWeight: 900,
          fontSize: 16,
          letterSpacing: "1px",
          boxShadow: "0 4px 20px rgba(239, 68, 68, 0.5)",
          textTransform: "uppercase",
        }}
      >
        <span style={{ fontSize: 18 }}>⚠️</span>
        <span>{category} • {year}</span>
      </div>
    </div>
  );
};
