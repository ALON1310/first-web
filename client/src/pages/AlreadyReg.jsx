import React, { useState } from 'react';
import './AlreadyReg.css';

const existingUsers = [
  { username: 'john', email: 'john@example.com', password: 'Password1' },
  { username: 'sara', email: 'sara@example.com', password: 'SaraPass2' },
  { username: 'mike', email: 'mike@example.com', password: 'Mike1234' },
];

function AlreadyReg({ onLogin, onBackToRegister }) {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { identifier, password } = form;
    if (!identifier || !password) {
      setError('Both fields are required.');
      return;
    }
    const user = existingUsers.find(
      u =>
        u.username.toLowerCase() === identifier.toLowerCase() ||
        u.email.toLowerCase() === identifier.toLowerCase()
    );
    if (!user) {
      setError('No such user. Please register first.');
      return;
    }
    if (user.password !== password) {
      setError('Incorrect password.');
      return;
    }
    onLogin({ firstName: user.username, email: user.email });
  };

  return (
    <div className="alreadyreg-page">
      <div className="login-form">
        <h2>Log In to SKY</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identifier">Username or Email</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="john or john@example.com"
              value={form.identifier}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Log In</button>

          <p className="switch-link">
            Don’t have an account?{' '}
            <button
              type="button"
              className="link-button"
              onClick={onBackToRegister}
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AlreadyReg;
