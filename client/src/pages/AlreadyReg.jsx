import React, { useState } from 'react';
import './AlreadyReg.css';

// Now includes admin/admin
const existingUsers = [
  { username: 'admin', email: 'admin@example.com', password: 'admin' },
  { username: 'john',  email: 'john@example.com',  password: 'Password1' },
  { username: 'sara',  email: 'sara@example.com',  password: 'SaraPass2' },
  { username: 'mike',  email: 'mike@example.com',  password: 'Mike1234' },
];

function AlreadyReg({ onLogin, onBackToRegister }) {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'rememberMe') {
      setRememberMe(checked);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { identifier, password } = form;
    if (!identifier || !password) {
      setError('Both fields are required.');
      return;
    }
    // Find user by username or email
    const user = existingUsers.find(
      u =>
        u.username.toLowerCase() === identifier.toLowerCase() ||
        u.email.toLowerCase()    === identifier.toLowerCase()
    );
    if (!user) {
      setError('No such user. Please register first.');
      return;
    }
    if (user.password !== password) {
      setError('Incorrect password.');
      return;
    }

    // Set cookie expiry
    const expires = new Date();
    if (rememberMe) expires.setDate(expires.getDate() + 12);
    else expires.setTime(expires.getTime() + 30 * 60000);

    document.cookie = `skyUser=${encodeURIComponent(
      user.username
    )}; expires=${expires.toUTCString()}; path=/`;

    // Notify App of successful login
    onLogin({ firstName: user.username, email: user.email });
  };

  return (
    <div className="alreadyreg-page">
      <div className="login-form">
        <h2>Log In to SKY</h2>
        <form onSubmit={handleSubmit}>
          {/* Identifier */}
          <div className="form-group">
            <label htmlFor="identifier">Username or Email</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="admin or admin@example.com"
              value={form.identifier}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
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

          {/* Remember Me */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Log In</button>

          {/* Back to Register */}
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
