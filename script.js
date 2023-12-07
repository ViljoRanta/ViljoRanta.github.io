// LoanContext.js
const LoanContext = React.createContext();

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
      return { loans:};
    default:
      return state;
  }
};

const LoanProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <LoanContext.Provider value={{ state, dispatch }}>
      {children}
    </LoanContext.Provider>
  );
};

const useLoanContext = () => {
  return React.useContext(LoanContext);
};
const App = () => {
  return (
    <LoanProvider>
      <div className="app">
        <h1>Loan Management App</h1>
        {/ Include other components}
      </div>
    </LoanProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
