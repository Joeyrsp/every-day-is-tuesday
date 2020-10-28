import { v4 as uuidv4 } from "uuid";
import { tuesdayMachine } from "/stateMachine";
import { newBubble } from "/utils";

// Initial app state
export default {
  customs: JSON.parse(window.localStorage.getItem('customs')) || [
    'change your sheets',
    'take a nap',
    'stretch',
    'write a list',
    'wash your face',
    'apply lotion',
  ], // this is a demo hack. replace with empty list when appropriate
  machine: tuesdayMachine.getInitialState('navigation.grounded.home').value,
  time: 0,
  bubbleSize: 50,
  bubbleSlots: {
    first: '',
    second: '',
    custom: '',
  },
  senses: {
    sight: true,
    smell: true,
    sound: true,
    taste: true,
    touch: true,
  },
  bubbles: Object.fromEntries([
    'sight',
    'sight',
    'smell',
    'smell',
    'sound',
    'sound',
    'taste',
    'taste',
    'touch',
    'touch',
    'custom',
    'custom',
  ].map((type) => [uuidv4(), newBubble(type)])),
}
