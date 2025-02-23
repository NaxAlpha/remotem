import { z } from "zod";
export const COMP_NAME = "MainVideo";

export const CompositionProps = z.object({
  text: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  text: "Hello World",
};

export const DURATION_IN_FRAMES = 90;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;
