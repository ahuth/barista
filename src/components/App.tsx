import { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { grinderMachine } from '../state-machines';
import ScreenReaderOnly from './ScreenReaderOnly';

type SectionFunc = (active: boolean) => React.ReactNode;

export default function App() {
  const [current, send] = useMachine(grinderMachine);
  const [items, setItems] = useState<SectionFunc[]>([]);

  useEffect(() => {
    let next: SectionFunc;

    switch (true) {
      case current.matches('empty'): {
        next = (active) => (
          <section>
            <p>The grinder sits silently. Patiently.</p>
            {active && <ScreenReaderOnly>2 actions available:</ScreenReaderOnly>}
            <button disabled={!active} onClick={() => send('FILL')}>Put beans in the hopper</button>
            <button disabled={!active} onClick={() => send('ACTIVATE')}>Turn it on.</button>
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
        next = (active) => (
          <section>
            <p>Now, finally, you're ready to grind.</p>
            {active && <ScreenReaderOnly>1 action available:</ScreenReaderOnly>}
            <button disabled={!active} onClick={() => send('ACTIVATE')}>Turn it on.</button>
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
        const active = index === items.length - 1;
        return sectionFunc(active);
      })}
    </main>
  );
}
