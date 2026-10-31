import React from "react";
import { Sequence } from "remotion";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Illusion } from "./scenes/Scene2Illusion";
import { Scene3Capes } from "./scenes/Scene3Capes";
import { Scene4Municipalities } from "./scenes/Scene4Municipalities";
import { Scene5CongressCTA } from "./scenes/Scene5CongressCTA";

export const MainComposition: React.FC = () => {
  return (
    <div
      style={{
        flex: 1,
        width: 1080,
        height: 1920,
        backgroundColor: "#0F172A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Paper grain noise overlay across entire video */}
      <NoiseOverlay />

      {/* Cena 1: O Gancho (00:00 – 00:05 | 300 frames) */}
      <Sequence from={0} durationInFrames={300} name="Cena 1 - O Gancho">
        <Scene1Hook />
      </Sequence>

      {/* Cena 2: A Ilusão do Piso vs. Realidade (00:05 – 00:12 | 420 frames) */}
      <Sequence from={300} durationInFrames={420} name="Cena 2 - Piso vs Realidade">
        <Scene2Illusion />
      </Sequence>

      {/* Cena 3: O Golpe na Ciência – Capes (00:12 – 00:20 | 480 frames) */}
      <Sequence from={720} durationInFrames={480} name="Cena 3 - Golpe na Ciência">
        <Scene3Capes />
      </Sequence>

      {/* Cena 4: Educação Básica nos Municípios (00:20 – 00:30 | 600 frames) */}
      <Sequence from={1200} durationInFrames={600} name="Cena 4 - Municípios">
        <Scene4Municipalities />
      </Sequence>

      {/* Cena 5: O Efeito Dominó no Congresso e CTA (00:30 – 00:40 | 600 frames) */}
      <Sequence from={1800} durationInFrames={600} name="Cena 5 - Congresso e CTA">
        <Scene5CongressCTA />
      </Sequence>
    </div>
  );
};
