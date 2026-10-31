import React from "react";
import { Composition } from "remotion";
import { MainComposition, MyVideoProps } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition<MyVideoProps>
        id="HelloWorld"
        component={MainComposition}
        durationInFrames={150} // 5 segundos a 30fps
        fps={30}
        width={1080}
        height={1920} // Formato vertical 9:16 (Stories, Reels, TikTok)
        defaultProps={{
          titleText: "Remotion no GitHub!",
          subtitleText: "Renderizado 100% de graça na nuvem do GitHub Actions 🚀",
        }}
      />
    </>
  );
};
