import { Dispatch, SetStateAction } from "react";
import { MousePosition } from "./types/TypeMousePosition";

type HandleParallaxEventProps = {
  e: MouseEvent;
  setMousePosition: Dispatch<SetStateAction<MousePosition>>;
};
export const handleParallaxEvent = ({
  e,
  setMousePosition,
}: HandleParallaxEventProps) => {
  if (window.screen.width > 768) {
    setMousePosition({ x: e.pageX, y: e.pageY });
  } else {
    setMousePosition({ x: 0, y: 0 });
  }
};
