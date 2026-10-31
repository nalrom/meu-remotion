import React from "react";
import { Composition } from "remotion";
import { MainComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Principal: Cortes na Educação 2027 (@profcarli) */}
      <Composition
        id="Educacao2027"
        component={MainComposition}
        durationInFrames={2400} // 40 segundos a 60fps
        fps={60}
        width={1080}
        height={1920} // Formato vertical estrito 9:16 (Instagram Reels)
      />

      {/* Alias para compatibilidade imediata com workflows anteriores */}
      <Composition
        id="HelloWorld"
        component={MainComposition}
        durationInFrames={2400}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
