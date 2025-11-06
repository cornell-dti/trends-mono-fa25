import { useMemo, useState } from "react";

const NonMemoizedFib = () => {
  const [foo, setFoo] = useState(0);
  const [input, setInput] = useState(34);

  const fib = (n: number): number => {
    if (n <= 1) {
      return 1;
    }
    return fib(n - 1) + fib(n - 2);
  };

  const value = fib(input);

  return (
    <div>
      <button onClick={() => setFoo(foo + 1)}>Trigger re-render</button>
      <input
        type="number"
        placeholder="enter the name here"
        value={input}
        onChange={(e) => setInput(parseInt(e.target.value))}
      />

      <p>{`Value: ${value}`}</p>
      <p>{`Count: ${foo}`}</p>
    </div>
  );
};

const MemoizedFib = () => {
  const [foo, setFoo] = useState(0);
  const [input, setInput] = useState(34);

  const value = useMemo(() => {
    const fib = (n: number): number => {
      if (n <= 1) {
        return 1;
      }
      return fib(n - 1) + fib(n - 2);
    };
    return fib(Math.max(input || 0, 0));
  }, [input]);

  return (
    <div>
      <button onClick={() => setFoo(foo + 1)}>Trigger re-render</button>
      <input
        type="number"
        placeholder="enter the name here"
        value={input}
        onChange={(e) => setInput(parseInt(e.target.value))}
      />

      <p>{`Value: ${value}`}</p>
      <p>{`Count: ${foo}`}</p>
    </div>
  );
};

const MemoDemo = () => {
  const [isMemo, setIsMemo] = useState(false);

  return (
    <div>
      <p>{`${isMemo ? "" : "Non-"}Memoized Fibonacci`}</p>
      <button onClick={() => setIsMemo(!isMemo)}>Toggle Memo</button>
      {isMemo ? <MemoizedFib /> : <NonMemoizedFib />}
    </div>
  );
};

export default MemoDemo;
