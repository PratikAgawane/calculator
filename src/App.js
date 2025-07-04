import React, { useState , useEffect} from 'react';
import './App.css';
import bgImage from './assets/calculatorbg.jpg';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setExpression(prev => prev + value);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleDelete = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const handleEquals = () => {
    try {
      const cleanedExpression = expression.replace(/%/g, '/100');
      const evalResult = eval(cleanedExpression); // ⚠️ only for learning, not production
      setResult(evalResult);
      setHistory(prev => [`${expression} = ${evalResult}`, ...prev]);
    } catch {
      setResult('Error');
    }
  };
  useEffect(() => {
  const handleKeyDown = (e) => {
    const keys = '0123456789+-*/.=';
    if (keys.includes(e.key)) {
      if (e.key === '=') handleEquals();
      else handleClick(e.key);
    }
    if (e.key === 'Enter') handleEquals();
    if (e.key === 'Backspace') handleDelete();
    if (e.key === 'Escape') handleClear();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [expression]);


  return (
    <div
      className="app-wrapper"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
    <div className="calculator">
      <h2>Simple Calculator</h2>

      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{result}</div>
      </div>

      <div className="buttons">
        {/* Numbers & Operations */}
        {['7','8','9','/','(','4','5','6','*',')','1','2','3','-','.','0','=','+','%'].map(btn => (
          <button
            key={btn}
            onClick={() => btn === '=' ? handleEquals() : handleClick(btn)}
          >
            {btn}
          </button>
        ))}
        <button onClick={handleDelete}>DEL</button>
        <button onClick={handleClear}>AC</button>
      </div>

      <div className="history">
        <h3>History</h3>
        <ul>
          {history.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div></div>
  );
}

export default App;
