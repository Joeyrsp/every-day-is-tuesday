import { Machine } from 'xstate';

export const tuesdayMachine = Machine({
  id: 'tuesday',
  type: 'parallel',
  states: {
    time: {
      initial: 'day',
      states: {
        day: {
          on: {
            TOGGLE_TIME: 'night',
          },
        },
        night: {
          on: {
            TOGGLE_TIME: 'day',
          },
        },
      },
    },
    navigation: {
      initial: 'grounded',
      states: {
        grounded: {
          initial: 'home',
          on: {
            SCEND: 'ascended'
          },
          states: {
            home: {
              on: {
                MENU: 'menu',
              },
            },
            menu: {
              on: {
                MENU: 'home',
              },
            },
          },
        },
        ascended: {
          initial: 'home',
          on: {
            SCEND: 'grounded'
          },
          states: {
            home: {
              on: {
                MENU: 'menu',
              },
            },
            menu: {
              on: {
                MENU: 'home',
              },
            },
          },
        },
      },
    }
  },
});
