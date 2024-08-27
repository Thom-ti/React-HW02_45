function App() {
  const [counters, setCounters] = React.useState([
    { id: 1, number: 0 },
    { id: 2, number: 0 },
    { id: 3, number: 0 },
    { id: 4, number: 0 },
    { id: 5, number: 0 },
  ]);

  const updateCounter = (id, n) => {
    let idx = counters.findIndex((el) => el.id === id);
    const newCounters = [...counters];
    if (newCounters[idx].number + n < 0) {
      return;
    } else {
      newCounters[idx].number += n;
    }
    setCounters(newCounters);
  };
  const sum = counters.reduce((acc, curr) => {
    return acc + curr.number;
  }, 0);

  function removeCounter(id) {
    setCounters((prev) => prev.filter((el) => el.id !== id));
  }
  function addCounter() {
    setCounters([...counters, { id: counters.length + 1, number: 0 }])
  }

  return (
    <div className="app">
      <h1 className="show-sum">Sum = {sum}</h1>
      <button
        onClick={() => {
          addCounter();
        }}
        className="btn-add"
      >
        Add Counter
      </button>
      <hr />
      {counters.map((el) => (
        <Counter
          key={el.id}
          item={el}
          updateCounter={updateCounter}
          removeCounter={removeCounter}
        />
      ))}
    </div>
  );
}

function Counter(props) {
  const { item, updateCounter, removeCounter } = props;
  return (
    <div className="counter">
      <button
        onClick={() => updateCounter(item.id, -1)}
        className="btn btn-dec"
      >
        -
      </button>
      <h3 className="number">{item.number}</h3>
      <button onClick={() => updateCounter(item.id, 1)} className="btn btn-inc">
        +
      </button>
      <button
        onClick={() => updateCounter(item.id, -item.number)}
        className="btn btn-clr"
      >
        C
      </button>
      <button onClick={() => removeCounter(item.id)} className="btn btn-clr">
        X
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
