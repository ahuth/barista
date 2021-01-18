import { useMachine } from '@xstate/react';
import { grinderMachine } from '../state-machines';

export default function App() {
  const [current, send] = useMachine(grinderMachine);

  return (
    <main>
      <h1>Barista</h1>
      <section>
        {current.matches('empty') && (
          <>
            <p>The grinder sits silently. Patiently.</p>
            <button onClick={() => send('FILL')}>Put beans in the hopper</button>
            <button onClick={() => send('ACTIVATE')}>Turn it on.</button>
          </>
        )}
        {current.matches('running_empty') && (
          <>
            <p>For some reason you ran the grinder despite the fact that there are no beans in it...</p>
            <p>Bzzzzzzzzzzzzzzzzz...</p>
          </>
        )}
        {current.matches('full') && (
          <>
            <p>Now, finally, you're ready to grind.</p>
            <button onClick={() => send('ACTIVATE')}>Turn it on.</button>
          </>
        )}
        {current.matches('running_full') && (
          <>
            <p>The machine works diligently, grinding the beans.</p>
            <p>Bzzzzzzzzzzzzzzzzz...</p>
          </>
        )}
      </section>
    </main>
  );
}
