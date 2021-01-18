import { Machine } from 'xstate';

export const grinder = Machine({
  id: 'grinder',
  initial: 'empty',
  states: {
    empty: {
      on: {
        GRINDER_FILL: 'full',
        GRINDER_RUN: 'grinding',
      }
    },
    full: {
      on: {
        GRINDER_RUN: 'grinding',
      },
    },
    grinding: {
      after: {
        2000: 'empty',
      },
    },
  },
});
