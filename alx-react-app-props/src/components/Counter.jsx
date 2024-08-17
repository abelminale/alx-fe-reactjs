import React, { useState } from 'react';

function Counter() {
  // Initialize state with useState hook
  const [count, setCount] = useState(0);

  // Define handlers for button clicks
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div>
      {/* Display the current count */}
      <p>Current Count: {count}</p>

      {/* Buttons to change the count */}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;