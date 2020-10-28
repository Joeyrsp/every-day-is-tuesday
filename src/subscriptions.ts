import { machineHasAll } from "./utils";
import { Animate, ResetTime } from "./actions";

const animateSub = (dispatch, props) => {
  const frame = (delta = undefined) => (time) => {
    id = window.requestAnimationFrame(frame());
    if (delta !== undefined) {
      dispatch([Animate, { time, delta }]);
    } else {
      dispatch([Animate, { time }]);
    }
  }

  let id = window.requestAnimationFrame(frame(0));
  console.log(`starting animation on frame ${id}`);

  // Cleanup function
  return () => {
    window.cancelAnimationFrame(id);
  }
}
const animate = () => [animateSub, {}];

// Usage in app
export const subscriptions = (state) => [
  Object.keys(state.bubbles).length ? animate() : null,
  // machineHasAll(state.machine, 'menu') ? animate() : null,
];
