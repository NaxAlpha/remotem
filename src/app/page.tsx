"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React from "react";
import {
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { Main } from "../remotion/MainVideo/Main";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-full h-full relative">
        <Player
          component={Main}
          inputProps={defaultMyCompProps}
          durationInFrames={DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          compositionHeight={VIDEO_HEIGHT}
          compositionWidth={VIDEO_WIDTH}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          controls
          autoPlay
          loop
        />
      </div>
    </div>
  );
};

export default Home;
