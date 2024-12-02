import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/emp/employees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        alert('Error fetching employees: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchEmployees();
  }, [refresh]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = employees.filter((emp) =>
      emp.first_name.toLowerCase().includes(value) ||
      emp.last_name.toLowerCase().includes(value) ||
      emp.position.toLowerCase().includes(value) ||
      emp.department.toLowerCase().includes(value)
    );

    setFilteredEmployees(filtered);

    if (!value) {
      setFilteredEmployees(employees);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

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
    <div className="employees-container">
      <header>
        <h1>Employee Management App</h1>
        <button onClick={handleLogout} className="log-out-button">
          Log Out
        </button>
      </header>
      <h2>Employees List</h2>
      <button onClick={() => setRefresh(!refresh)} className="add-button">
          Add Employee
      </button>
      <div className="search-container">
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <button onClick={() => navigate(`/update-employee/${employee._id}`)} className="action-button">
                  Update
                </button>
                <button onClick={() => handleDeleteEmployee(employee._id)} className="action-button delete">
                  Delete
                </button>
                <button onClick={() => handleViewEmployee(employee._id)} className="action-button view">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;