import { tuesdayMachine } from "/stateMachine";
import { machineHasAll, clamp, sign } from "./utils";

export const Menu = (state) => ({
  ...state,
  machine: tuesdayMachine.transition(state.machine, 'MENU').value,
});

export const Scend = (state) => ({
  ...state,
  machine: tuesdayMachine.transition(state.machine, 'SCEND').value,
})

export const ToggleTime = (state) => ({
  ...state,
  machine: tuesdayMachine.transition(state.machine, 'TOGGLE_TIME').value,
})

export const GrabBubble = (state, event) => {
  event.path.forEach(node => {
    if (node.nodeName == 'svg') {
      console.log(node.id)
    }
  });
  return state;
}

const phys = {
  targetHeight: 200,
  buoyancy: 20,
  wiggle: 200,
  spin: 1 / 5,
  friction: 0.99,
  pushScale: 50,
  pushForce: 800,
  wallForce: 0.25,
  dieSpeed: 300,
}

export const Animate = (state, props) => {
  // let water: HTMLCanvasElement = document.querySelector('.water')
  // water.width = window.innerWidth;
  // water.height = window.innerHeight;
  // let ctx = water.getContext('2d');

  // time
  let time = props.time;
  let delta = 0;
  if (props.delta !== undefined) {
    delta = props.delta;
  } else {
    delta = time - state.time;
  }
  let deltaS = delta / 1000;

  // console.log(delta);

  return {
    ...state,
    time,
    bubbles: Object.fromEntries(Object.entries(state.bubbles).map(([key, bubble], index) => {
      if (bubble.state == 'idle') {
        let vel = {
          x: bubble.dx,
          y: bubble.dy,
        }

        let angle = bubble.rand1 * 2 * Math.PI + time / 1000 * 2 * phys.spin * Math.PI * (bubble.rand1 % 0.1 > 0.05 ? 1 : -1);

        vel.x += phys.wiggle * Math.sin(angle) * deltaS;
        vel.y += phys.wiggle * Math.cos(angle) * deltaS;

        // vel.y += -buoyancy * deltaS;
        let heightDiff = bubble.y - phys.targetHeight;
        vel.y += -phys.buoyancy * (heightDiff > 0 ? Math.pow(heightDiff / 30, 2) : -1 * Math.pow(heightDiff / 10, 2)) * deltaS;

        vel.x += -sign(bubble.x) * Math.pow(clamp(0, Math.abs(bubble.x), window.innerWidth / 2) * phys.wallForce, 2) * deltaS;

        Object.values(state.bubbles).map((otherBubble) => {
          let xDiff = (otherBubble.x - bubble.x) / phys.pushScale;
          let yDiff = (otherBubble.y - bubble.y) / phys.pushScale;
          let dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
          if (dist) {
            vel.x -= xDiff / (dist * dist + dist) * phys.pushForce * deltaS;
            vel.y -= yDiff / (dist * dist + dist) * phys.pushForce * deltaS;
          }
        });

        return [key, {
          ...bubble,
          dx: vel.x * Math.pow((1 - phys.friction), deltaS),
          dy: vel.y * Math.pow((1 - phys.friction), deltaS),
          x: bubble.x + vel.x * deltaS,
          y: bubble.y + vel.y * deltaS,
        }]
      } else if (bubble.state == 'dying') {
        return [key, {
          ...bubble,
          x: bubble.x + bubble.dx * deltaS,
          y: bubble.y + -phys.dieSpeed * deltaS,
        }]
      }
    })),
  }
}
