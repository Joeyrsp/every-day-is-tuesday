import { v4 as uuidv4 } from "uuid";
import { tuesdayMachine } from "/stateMachine";
import { machineHasAll, clamp, sign, newBubble } from "./utils";
import { getGrounded, getAscended, getGroundedCustom } from "./rituals";
import { stateValuesEqual } from "xstate/lib/State";

export const MarkBubbles = (state) => ({
  ...state,
  bubbleSlots: {
    first: '',
    second: '',
    custom: '',
  },
  message: '',
  bubbles: Object.fromEntries(Object.entries(state.bubbles).map(([id, bubble]) => [id, { ...bubble, state: 'dying' }])),
})

export const RemoveBubble = (state, id) => {
  let { [id]: _, ...bubbles } = state.bubbles;
  return {
    ...state,
    bubbles,
  }
}

export const FillBubbles = (state, destination) => {
  let queue = [];
  if (destination == 'ascended') {
    queue = [
      'activity',
      'activity',
      'activity',
      'activity',
      'embody',
      'embody',
      'embody',
      'embody',
      'scene',
      'scene',
      'scene',
      'scene',
    ]
  } else {
    Object.entries(state.senses).forEach(([sense, active]) => active && queue.push(sense) && queue.push(sense));
    queue.push('custom');
    queue.push('custom');
  }
  let final = MarkBubbles(state);
  return {
    ...final,
    bubbles: {
      ...final.bubbles,
      ...Object.fromEntries(queue.map((type) => [uuidv4(), newBubble(type)]))
    }
  }
}

export const Menu = (state) => {
  {
    let final = {
      ...state,
      machine: tuesdayMachine.transition(state.machine, 'MENU').value,
    }
    final = (machineHasAll(final.machine, 'home') ?
    FillBubbles(final,
      machineHasAll(final.machine, 'grounded') && 'grounded' ||
      machineHasAll(final.machine, 'ascended') && 'ascended'
    ) :
    MarkBubbles(final));
    return final;
  }
}

export const Scend = (state) => {
  let final = {
    ...state,
    machine: tuesdayMachine.transition(state.machine, 'SCEND').value,
  }
  return FillBubbles(MarkBubbles(final), machineHasAll(final.machine, 'grounded') && 'grounded' || machineHasAll(final.machine, 'ascended') && 'ascended')
}

export const GenRitual = (state) => {
  if ((state.bubbleSlots.first != '' && state.bubbleSlots.second != '')) {
    return {
      ...state,
      message: machineHasAll(state.machine, 'grounded') ? (state.bubbleSlots.custom != '' ? getGroundedCustom(state.customs, state.bubbles[state.bubbleSlots.first].type, state.bubbles[state.bubbleSlots.second].type) : getGrounded(state.bubbles[state.bubbleSlots.first].type, state.bubbles[state.bubbleSlots.second].type)) : getAscended(),
    }
  } else {
    return {
      ...state,
      machine: tuesdayMachine.transition(state.machine, 'TOGGLE_TIME').value,
    }
  }
}

export const GrabBubble = (state, event) => {
  let id = '';
  event.path.forEach(node => {
    if (node.nodeName == 'svg') {
      id = node.id;
    }
  });
  let bubble = state.bubbles[id];

  let final = {
    ...state,
  }
  if (Object.values(state.bubbleSlots).includes(id)) {
    final = {
      ...state,
      bubbleSlots:
        state.bubbleSlots.first == id && {
          ...state.bubbleSlots,
          first: '',
        } ||
        state.bubbleSlots.second == id && {
          ...state.bubbleSlots,
          second: '',
        } ||
        state.bubbleSlots.custom == id && {
          ...state.bubbleSlots,
          custom: '',
        },
      message: '',
    };
  } else {
    if (bubble.type == 'custom') {
      if (state.bubbleSlots.custom == '') {
        final = {
          ...final,
          bubbleSlots: {
            ...state.bubbleSlots,
            custom: id,
          }
        }
      }
    } else if (state.bubbleSlots.first == '' || state.bubbleSlots.second == '') {
      final = {
        ...final,
        bubbleSlots: {
          ...state.bubbleSlots,
          [state.bubbleSlots.first == '' ? 'first' : 'second']: id,
        }
      }
    }
  }
  if (Object.values(final.bubbleSlots).includes(id) || Object.values(state.bubbleSlots).includes(id)) {
    let update = {};
    if (final.bubbleSlots.first != '') {
      update[final.bubbleSlots.first] = {
        ...final.bubbles[final.bubbleSlots.first],
        x: -((final.bubbles[final.bubbleSlots.first].size + (final.bubbleSlots.custom != '' ? 60 : 0)) / 2 + 15),
        y: 50,
        dx: 0,
        dy: 0,
      }
    }
    if (final.bubbleSlots.second != '') {
      update[final.bubbleSlots.second] = {
        ...final.bubbles[final.bubbleSlots.second],
        x: ((final.bubbles[final.bubbleSlots.second].size + (final.bubbleSlots.custom != '' ? 60 : 0)) / 2 + 15),
        y: 50,
        dx: 0,
        dy: 0,
      }
    }
    if (final.bubbleSlots.custom != '') {
      update[final.bubbleSlots.custom] = {
        ...final.bubbles[final.bubbleSlots.custom],
        x: 0,
        y: 50,
        dx: 0,
        dy: 0,
      }
    }
    final = {
      ...final,
      bubbles: {
        ...final.bubbles,
        ...update,
      }
    }
  }
  return final;
}

const phys = {
  targetHeight: 275,
  buoyancy: 20,
  wiggle: 400,
  spin: 1 / 10,
  friction: 0.99,
  pushScale: 25,
  pushForce: 1800,
  wallForce: 0.25,
  wallOffset: 200,
  dieSpeed: 300,
}

export const Animate = (state, props) => {
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
    bubbles: Object.fromEntries(Object.entries(state.bubbles).map(([id, bubble]) => {
      if (bubble.state == 'idle' && !Object.values(state.bubbleSlots).includes(id)) {
        let vel = {
          x: bubble.dx,
          y: bubble.dy,
        }

        let angle = bubble.rand1 * 2 * Math.PI + time / 1000 * 2 * phys.spin * Math.PI * (bubble.rand1 % 0.1 > 0.05 ? 1 : -1);

        vel.x += phys.wiggle * Math.sin(angle) * deltaS;
        vel.y += phys.wiggle * Math.cos(angle) * deltaS;

        // vel.y += -buoyancy * deltaS;
        let heightDiff = bubble.y - phys.targetHeight;
        vel.y -= phys.buoyancy * (heightDiff > 0 ? Math.pow(heightDiff / 30, 2) : -1 * Math.pow(heightDiff / 10, 2)) * deltaS;

        vel.x -= sign(bubble.x) * Math.pow(clamp(0, Math.abs(bubble.x) + phys.wallOffset - window.innerWidth / 2, window.innerWidth / 2) * phys.wallForce, 2) * deltaS;

        Object.entries(state.bubbles).map(([otherId, otherBubble]) => {
          if (!Object.values(state.bubbleSlots).includes(otherId)) {
            let xDiff = (otherBubble.x - bubble.x) / phys.pushScale;
            let yDiff = (otherBubble.y - bubble.y) / phys.pushScale;
            let dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            if (dist) {
              vel.x -= xDiff / (dist * dist + dist) * phys.pushForce * deltaS;
              vel.y -= yDiff / (dist * dist + dist) * phys.pushForce * deltaS;
            }
          }
        });

        return [id, {
          ...bubble,
          dx: vel.x * Math.pow((1 - phys.friction), deltaS),
          dy: vel.y * Math.pow((1 - phys.friction), deltaS),
          x: clamp((-window.innerWidth + bubble.size) / 2, bubble.x + vel.x * deltaS, (window.innerWidth - bubble.size) / 2),
          y: bubble.y + vel.y * deltaS,
        }]
      } else if (bubble.state == 'dying') {
        return [id, {
          ...bubble,
          x: bubble.x + bubble.dx * deltaS,
          y: bubble.y + -phys.dieSpeed * deltaS,
        }]
      } else {
        return [id, bubble];
      }
    })),
  }
  return state;
}
