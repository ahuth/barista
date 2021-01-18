import { useEffect, useRef, useState } from 'react';
import { useMachine } from '@xstate/react';
import { grinderMachine } from '../state-machines/grinder';
import ScreenReaderOnly from './ScreenReaderOnly';

type SectionFunc = (id: number, active: boolean) => React.ReactNode;

export default function App() {
  const [current, send] = useMachine(grinderMachine);
  const [items, setItems] = useState<SectionFunc[]>([]);
  const latestSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let next: SectionFunc;

    switch (true) {
      case current.matches('empty'): {
        next = (id, active) => (
          <section key={id} ref={active ? latestSectionRef : undefined} tabIndex={active ? -1 : undefined}>
            <p>The grinder sits silently. Patiently.</p>
            {active && <ScreenReaderOnly>2 actions available:</ScreenReaderOnly>}
            <button disabled={!active} onClick={() => send('FILL')}>Put beans in the hopper</button>
            <button disabled={!active} onClick={() => send('ACTIVATE')}>Turn it on.</button>
          </section>
        );
        break;
      }
      case current.matches('running_empty'):
        next = (id, active) => (
          <section key={id} ref={active ? latestSectionRef : undefined} tabIndex={active ? -1 : undefined}>
            <p>For some reason you ran the grinder despite the fact that there are no beans in it...</p>
            <p>Bzzzzzzzzzzzzzzzzz...</p>
          </section>
        );
        break;
      case current.matches('full'):
        next = (id, active) => (
          <section key={id} ref={active ? latestSectionRef : undefined} tabIndex={active ? -1 : undefined}>
            <p>Now, finally, you're ready to grind.</p>
            {active && <ScreenReaderOnly>1 action available:</ScreenReaderOnly>}
            <button disabled={!active} onClick={() => send('ACTIVATE')}>Turn it on.</button>
          </section>
        );
        break;
      case current.matches('running_full'):
        next = (id, active) => (
          <section key={id} ref={active ? latestSectionRef : undefined} tabIndex={active ? -1 : undefined}>
            <p>The machine works diligently, grinding the beans.</p>
            <p>Bzzzzzzzzzzzzzzzzz...</p>
          </section>
        );
        break;
    }

    setItems((prev) => prev.concat(next ? [next] : []));

    const timeoutId = setTimeout(() => {
      if (latestSectionRef.current) {
        latestSectionRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [current, send]);

  return (
    <main>
      <h1>Barista</h1>
      {items.map((sectionFunc, index) => {
        const active = index === items.length - 1;
        return sectionFunc(index, active);
      })}
    </main>
  );
}
