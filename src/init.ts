import { tuesdayMachine } from "/stateMachine";

// Initial app state
export default {
  customs: JSON.parse(window.localStorage.getItem('customs')) || [
    'change your sheets',
    'take a nap',
    'stretch',
    'write a list',
    'wash your face',
    'apply lotion',
  ], // this is a demo hack. remove when appropriate
  machine: tuesdayMachine.getInitialState('navigation.ascended.home').value,
}
