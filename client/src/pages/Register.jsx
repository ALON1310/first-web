import React, { useState } from 'react';
import './Register.css';

const existingUsers = ['john', 'sara', 'mike'];

function Register({ onLogin, onShowLogin }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const isPasswordStrong = pass =>
    pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass);

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};

    if (!form.username) {
      newErrors.username = 'Username is required.';
    } else if (existingUsers.includes(form.username.toLowerCase())) {
      newErrors.username = 'This username is already taken.';
    }

    if (!form.email) {
      newErrors.email = 'Email is required.';
    }

    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (!isPasswordStrong(form.password)) {
      newErrors.password =
        'Password must be ≥8 chars, include an uppercase letter and a number.';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // onLogin expects a user object; here we pass at least firstName & email
      onLogin({ firstName: form.username, email: form.email });
    }
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="error">{errors.username}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
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
            {errors.password && (
              <p className="error">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit">Register</button>

          <p className="switch-link">
            Already have an account?{' '}
            <button
              type="button"
              className="link-button"
              onClick={onShowLogin}
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
