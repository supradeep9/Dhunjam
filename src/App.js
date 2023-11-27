import logo from "./logo.svg";
import { createContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

import Dashboard from "./components/Dashboard";

import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const userContext = createContext();
const initialState = 2;
function reducer(state, action) {
  if (action.type === "save-id") {
    return action.payload;
  }
  return state;
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={[state, dispatch]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
