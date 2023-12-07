// App.js
import React from 'react';
import LoanList from './LoanList';
import LoanForm from './LoanForm';
import Aggregations from './Aggregations';
import { LoanProvider } from './LoanContext';
import './App.css';

function App() {
  return (
    <LoanProvider>
      <div className="app">
        <h1>Loan Management App</h1>
        <LoanForm />
        <LoanList />
        <Aggregations />
      </div>
    </LoanProvider>
  );
}

export default App;

// LoanContext.js
import React, { createContext, useContext, useReducer } from 'react';

const LoanContext = createContext();

const initialState = {
  loans: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LOAN':
      return { loans: [...state.loans, action.payload] };
    case 'DELETE_LOAN':
      return { loans: state.loans.filter((loan) => loan.id !== action.payload) };
    case 'REDUCE_DEBT':
      // Logic to reduce debt for a specific loan
      return { loans: /* updated loan array */ };
    default:
      return state;
  }
};

const LoanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoanContext.Provider value={{ state, dispatch }}>
      {children}
    </LoanContext.Provider>
  );
};

const useLoanContext = () => {
  return useContext(LoanContext);
};

export { LoanProvider, useLoanContext };

// LoanForm.js
import React, { useState } from 'react';
import { useLoanContext } from './LoanContext';

const LoanForm = () => {
  const { dispatch } = useLoanContext();
  const [loaner, setLoaner] = useState('');
  const [debt, setDebt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    dispatch({ type: 'ADD_LOAN', payload: { id: Date.now(), loaner, debt: parseFloat(debt) } });
    setLoaner('');
    setDebt('');
  };
return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Loaner" value={loaner} onChange={(e) => setLoaner(e.target.value)} />
      <input type="number" placeholder="Debt" value={debt} onChange={(e) => setDebt(e.target.value)} />
      <button type="submit">Add Loan</button>
    </form>
  );
};

export default LoanForm;

// LoanList.js
import React from 'react';
import { useLoanContext } from './LoanContext';

const LoanList = () => {
  const { state, dispatch } = useLoanContext();

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_LOAN', payload: id });
  };

  const handleReduceDebt = (id) => {
    dispatch({ type: 'REDUCE_DEBT', payload: id });
  };

  return (
    <div>
      <h2>Loan List</h2>
      <ul>
        {state.loans.map((loan) => (
          <li key={loan.id}>
            {loan.loaner} owes ${loan.debt}{' '}
            <button onClick={() => handleDelete(loan.id)}>Delete</button>
            <button onClick={() => handleReduceDebt(loan.id)}>Reduce Debt</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;

// Aggregations.js
import React from 'react';
import { useLoanContext } from './LoanContext';

const Aggregations = () => {
  const { state } = useLoanContext();

  const totalDebt = state.loans.reduce((sum, loan) => sum + loan.debt, 0);
  const averageDebt = state.loans.length > 0 ? totalDebt / state.loans.length : 0;

  return (
    <div>
      <h2>Aggregations</h2>
      <p>Total Debt: ${totalDebt}</p>
      <p>Average Debt: ${averageDebt}</p>
    </div>
  );
};

export default Aggregations;
