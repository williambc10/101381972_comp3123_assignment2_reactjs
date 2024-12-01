import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Employees from './components/Employees';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/update-employee/:empid" element={<UpdateEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;