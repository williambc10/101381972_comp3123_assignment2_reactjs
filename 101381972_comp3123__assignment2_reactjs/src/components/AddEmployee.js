import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css'

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    department: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/emp/employees', employeeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Employee added successfully!');
      navigate('/employees'); // Redirect to the employee list
    } catch (error) {
      alert('Error adding employee: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="add-employee-container">
      <form onSubmit={handleSubmit} className="add-employee-form">
        <h1>Add Employee</h1>
        <label>First Name:</label>
        <input type="text" name="first_name" value={employeeData.first_name} onChange={handleChange} required />
        <label>Last Name:</label>
        <input type="text" name="last_name" value={employeeData.last_name} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />
        <label>Position:</label>
        <input type="text" name="position" value={employeeData.position} onChange={handleChange} required />
        <label>Salary:</label>
        <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} required />
        <label>Department:</label>
        <input type="text" name="department" value={employeeData.department} onChange={handleChange} required />
        <button type="submit" className="add-employee-button">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;