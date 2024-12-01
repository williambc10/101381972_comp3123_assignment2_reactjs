import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    department: '',
  });

  const { empid } = useParams(); // Get the employee ID from the route
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
      navigate('/employees'); // Redirect to the employee list
    } catch (error) {
      alert('Error updating employee: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>Update Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="first_name" value={employeeData.first_name} onChange={handleChange} required />
        <br />
        <label>Last Name:</label>
        <input type="text" name="last_name" value={employeeData.last_name} onChange={handleChange} required />
        <br />
        <label>Email:</label>
        <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />
        <br />
        <label>Position:</label>
        <input type="text" name="position" value={employeeData.position} onChange={handleChange} required />
        <br />
        <label>Salary:</label>
        <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} required />
        <br />
        <label>Department:</label>
        <input type="text" name="department" value={employeeData.department} onChange={handleChange} required />
        <br />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;