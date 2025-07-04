import React, { useState , useEffect , useCallback} from 'react';
import './App.css';
import bgImage from './assets/calculatorbg.jpg';
import { evaluate } from 'mathjs';


function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState(() => {
  const saved = localStorage.getItem('calc-history');
  return saved ? JSON.parse(saved) : [];
});
useEffect(() => {
  localStorage.setItem('calc-history', JSON.stringify(history));
}, [history]);

 const handleClick = useCallback((value) => {
  setExpression(prev => prev + value);
}, []);

const handleClear = useCallback(() => {
  setExpression('');
  setResult('');
}, []);

const handleDelete = useCallback(() => {
  setExpression(prev => prev.slice(0, -1));
}, []);

const handleEquals = useCallback(() => {
  try {
    const cleanedExpression = expression.replace(/%/g, '/100');
    const evalResult = evaluate(cleanedExpression);
    setResult(evalResult);
    setHistory(prev => [`${expression} = ${evalResult}`, ...prev]);
  } catch {
    setResult('Error');
  }
}, [expression]);

 useEffect(() => {
  const handleKeyDown = (e) => {
    const keys = '0123456789+-*/.=%()';
    if (keys.includes(e.key)) {
      if (e.key === '=' || e.key === 'Enter') handleEquals();
      else handleClick(e.key);
    }
    if (e.key === 'Backspace') handleDelete();
    if (e.key === 'Escape') handleClear();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [handleEquals, handleClick, handleDelete, handleClear]);


 


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
