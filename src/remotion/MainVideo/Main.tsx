import { z } from "zod";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CompositionProps } from "../../../types/constants";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";

loadFont();

export const Main = ({ text }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill className="bg-white">
      <AbsoluteFill className="items-center justify-center">
        <h1
          className="text-[70px] font-bold"
          style={{
            fontFamily,
            opacity,
          }}
        >
          {text}
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
