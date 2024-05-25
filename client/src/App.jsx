// File: src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/user/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./features/user/Register";
import './index.css';
import './App.css';

function App() {
  // const theme = useSelector((state) => state.theme.value);

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />         
        </Routes>
      </Router>   
  );
}

export default App;
