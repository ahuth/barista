import { Machine } from 'xstate';

export const coffee = Machine({
  id: 'coffee',
  type: 'parallel',
  states: {
    grinder: {
      id: 'grinder',
      initial: 'empty',
      states: {
        empty: {
          on: {
            FILL: 'full',
            TURN_ON: 'running_empty',
          },
        },
        running_empty: {
          after: {
            2000: 'empty',
          },
        },
        full: {
          on: {
            TURN_ON: 'running',
          },
        },
        running: {
          after: {
            2000: 'ground',
          },
        },
        ground: {
          on: {
            EMPTY: 'empty',
            TURN_ON: 'running_ground',
          },
        },
        running_ground: {
          after: {
            2000: 'ground',
          },
        },
      },
    },
  },
});
