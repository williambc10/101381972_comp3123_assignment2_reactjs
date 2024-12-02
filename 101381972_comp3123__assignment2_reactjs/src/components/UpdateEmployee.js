import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateEmployee.css'

const UpdateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    department: '',
  });

  const { empid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/emp/employees/${empid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeData(response.data);
      } catch (error) {
        alert('Error fetching employee details: ' + error.response?.data?.message || error.message);
      }
    };

    fetchEmployee();
  }, [empid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post(`/emp/employees/${empid}`, employeeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (error) {
      alert('Error updating employee: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="update-employee-container">
      <form onSubmit={handleSubmit} className="update-employee-form">
        <h1>Update Employee</h1>
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
        <button type="submit" className="update-button">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;