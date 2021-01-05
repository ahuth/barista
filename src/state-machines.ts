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
            GRINDER_ON: 'running_empty',
          },
        },
        running_empty: {
          after: {
            2000: 'empty',
          },
        },
        full: {
          on: {
            GRINDER_ON: 'running',
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
            GRINDER_ON: 'running_ground',
          },
        },
        running_ground: {
          after: {
            2000: 'ground',
          },
        },
      },
    },
    machine: {
      id: 'machine',
      initial: 'off',
      states: {
        off: {
          on: {
            MACHINE_ON: 'heating',
          },
        },
        heating: {
          on: {
            MACHINE_OFF: 'off',
          },
          after: {
            10000: 'hot',
          },
        },
        hot: {
          on: {
            MACHINE_OFF: 'off',
          },
        },
      },
    },
  },
});
