import { Machine } from 'xstate';

interface GrinderContext {}

interface GrinderState {
  states: {
    empty: {},
    running_empty: {},
    full: {},
    running_full: {},
  },
}

type GrinderEvent =
  | { type: 'ACTIVATE' }
  | { type: 'FILL' }

const grinderMachine = Machine<GrinderContext, GrinderState, GrinderEvent>({
  id: 'grinder',
  initial: 'empty',
  states: {
    empty: {
      on: {
        ACTIVATE: 'running_empty',
        FILL: 'full',
      },
    },
    running_empty: {
      after: {
        2000: 'empty',
      },
    },
    full: {
      on: {
        ACTIVATE: 'running_full',
      },
    },
    running_full: {
      after: {
        2000: 'empty',
      },
    },
  },
});

export default grinderMachine;
