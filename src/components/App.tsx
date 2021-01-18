import { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { grinderMachine } from '../state-machines';

type SectionFunc = (enabled: boolean) => React.ReactNode;

export default function App() {
  const [current, send] = useMachine(grinderMachine);
  const [items, setItems] = useState<SectionFunc[]>([]);

  useEffect(() => {
    let next: SectionFunc;

    switch (true) {
      case current.matches('empty'): {
        next = (enabled) => (
          <section>
            <p>The grinder sits silently. Patiently.</p>
            <button disabled={!enabled} onClick={() => send('FILL')}>Put beans in the hopper</button>
            <button disabled={!enabled} onClick={() => send('ACTIVATE')}>Turn it on.</button>
          </section>
        );
        break;
      }
      case current.matches('running_empty'):
        next = () => (
          <section>
            <p>For some reason you ran the grinder despite the fact that there are no beans in it...</p>
            <p>Bzzzzzzzzzzzzzzzzz...</p>
          </section>
        );
        break;
      case current.matches('full'):
        next = (enabled) => (
          <section>
            <p>Now, finally, you're ready to grind.</p>
            <button disabled={!enabled} onClick={() => send('ACTIVATE')}>Turn it on.</button>
          </section>
        );
        break;
      case current.matches('running_full'):
        next = () => (
          <section>
            <p>The machine works diligently, grinding the beans.</p>
            <p>Bzzzzzzzzzzzzzzzzz...</p>
          </section>
        );
        break;
    }

    setItems((prev) => prev.concat(next ? [next] : []));
  }, [current, send]);

  return (
    <main>
      <h1>Barista</h1>
      {items.map((sectionFunc, index) => {
        const enabled = index === items.length - 1;
        return sectionFunc(enabled);
      })}
    </main>
  );
}
