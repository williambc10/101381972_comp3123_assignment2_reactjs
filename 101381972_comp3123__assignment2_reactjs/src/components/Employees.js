import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/emp/employees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
      } catch (error) {
        alert('Error fetching employees: ' + error.response?.data?.message || error.message);
      }
    };

    fetchEmployees();
  }, [refresh]);

  const handleDeleteEmployee = async (empid) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete('/emp/employees', {
        headers: { Authorization: `Bearer ${token}` },
        params: { eid: empid },
      });
      alert('Employee deleted successfully!');
      setRefresh(!refresh);
    } catch (error) {
      alert('Error deleting employee: ' + error.response?.data?.message || error.message);
    }
  };

  const handleViewEmployee = async (empid) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/emp/employees/${empid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Employee Details:\nFirst Name: ${response.data.first_name}\nLast Name: ${response.data.last_name}\nEmail: ${response.data.email}\nPosition: ${response.data.position}\nDepartment: ${response.data.department}`);
    } catch (error) {
      alert('Error viewing employee: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <h2 style={{ textAlign: 'center' }}>Employee List</h2>
      <button onClick={() => navigate('/add-employee')}>Add Employee</button>
      <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee ID</th>
            <th>Admin Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee._id}</td>
              <td>
                <button onClick={() => navigate(`/update-employee/${employee._id}`)}>Update</button>
                <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                <button onClick={() => handleViewEmployee(employee._id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;