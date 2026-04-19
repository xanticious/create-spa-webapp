import { useMachine } from '@xstate/react';
import { counterMachine } from '../machines/counterMachine';

export default function Counter() {
  const [state, send] = useMachine(counterMachine);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>XState Counter</h3>
      <div className="counter-example">
        <button onClick={() => send({ type: 'DECREMENT' })}>−</button>
        <span>{state.context.count}</span>
        <button onClick={() => send({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => send({ type: 'RESET' })}>Reset</button>
      </div>
    </div>
  );
}
