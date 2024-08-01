import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', email: '', dob: '', password: '' });

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await api.put(`/users/${form.id}`, form);
      } else {
        await api.post('/users', form);
      }
      setForm({ id: '', name: '', email: '', dob: '', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Failed to submit user:', error);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={form.id} />
        <input 
          type="text" 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required 
        />
        <input 
          type="email" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          placeholder="Email" 
          required 
        />
        <input 
          type="date" 
          name="dob" 
          value={form.dob} 
          onChange={handleChange} 
          placeholder="Date of Birth" 
          required 
        />
        <input 
          type="password" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          placeholder="Password" 
          required 
        />
        <button type="submit">{form.id ? 'Update' : 'Add'}</button>
        {form.id && <button type="button" onClick={() => setForm({ id: '', name: '', email: '', dob: '', password: '' })}>Cancel</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
