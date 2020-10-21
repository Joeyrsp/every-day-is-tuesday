import { Machine } from 'xstate';

export const tuesdayMachine = Machine({
    id: 'tuesday',
    initial: 'filling',
    context: {},
    states: {
        filling: {
            on: {
                NEXT: 'setScene'
            }
        },
        setScene: {
            on: {
                NEXT: 'bubbling'
            }
        },
        bubbling: {
            on: {
                NEXT: 'home'
            }
        },
        home: {
            on: {
                NEW_CUSTOM: 'writing',
                TAP_BUBBLE: 'selecting',
                MENU: 'menu',
                VIEW_PEBBLES: 'pebbles',
            }
        },
        writing: {
            on: {
                RETURN: 'home'
            }
        },
        selecting: {
            on: {
                RETURN: 'home'
            }
        },
        menu: {
            on: {
                RETURN: 'home'
            }
        },
        pebbles: {
            on: {
                RETURN: 'home'
            }
        },
    },
});