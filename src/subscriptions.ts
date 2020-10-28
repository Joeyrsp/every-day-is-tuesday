import { machineHasAll } from "./utils";
import { Animate, RemoveBubble } from "./actions";

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

const removeBubbleSub = (dispatch, id) => {
  dispatch([RemoveBubble, id]);

  // Cleanup function
  return () => {}
}
const removeBubble = ({ id }) => [removeBubbleSub, id];

// Usage in app
export const subscriptions = (state) => [
  Object.keys(state.bubbles).length > 0 ? animate() : null,
  Object.entries(state.bubbles).map(([id, bubble]) => bubble.state == 'dying' && bubble.y < -100 ? removeBubble({ id }) : null),
];
