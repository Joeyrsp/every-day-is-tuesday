import { tuesdayMachine } from "/stateMachine";

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
