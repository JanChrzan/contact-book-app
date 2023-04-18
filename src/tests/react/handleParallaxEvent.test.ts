import { handleParallaxEvent } from "../../utils/handleParallaxEvent";

describe("handleParallaxEvent", () => {
  const setMousePosition = jest.fn();
  const e: MouseEvent = new MouseEvent("mousemove", {
    clientX: 100,
    clientY: 200,
  });
  Object.defineProperty(e, "pageX", { value: 100 });
  Object.defineProperty(e, "pageY", { value: 200 });

  it("should set mouse position to pageX and pageY if screen width is greater than 768", () => {
    Object.defineProperty(window.screen, "width", {
      writable: true,
      configurable: true,
      value: 769,
    });
    handleParallaxEvent({ e, setMousePosition });
    expect(setMousePosition).toHaveBeenCalledWith({ x: 100, y: 200 });
  });

  it("should set mouse position to 0,0 if screen width is less than or equal to 768", () => {
    Object.defineProperty(window.screen, "width", {
      writable: true,
      configurable: true,
      value: 768,
    });
    handleParallaxEvent({ e, setMousePosition });
    expect(setMousePosition).toHaveBeenCalledWith({ x: 0, y: 0 });
  });
});
