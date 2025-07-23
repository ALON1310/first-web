import React, { useState } from 'react';
import './Register.css';

// Now includes 'admin' as an existing user
const existingUsers = ['admin', 'john', 'sara', 'mike'];

function Register({ onLogin, onShowLogin }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'rememberMe') {
      setRememberMe(checked);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const isPasswordStrong = pass =>
    pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass);

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};

    // — Block admin and other existing usernames
    if (!form.username) {
      newErrors.username = 'Username is required.';
    } else if (existingUsers.includes(form.username.toLowerCase())) {
      newErrors.username = 'This username is already taken.';
    }

    if (!form.email) newErrors.email = 'Email is required.';

    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (!isPasswordStrong(form.password)) {
      newErrors.password =
        'Password must be ≥8 chars, include an uppercase letter & a number.';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // Set cookie expiry: 12 days if rememberMe, else 30 minutes
    const expires = new Date();
    if (rememberMe) expires.setDate(expires.getDate() + 12);
    else expires.setTime(expires.getTime() + 30 * 60000);

    document.cookie = `skyUser=${encodeURIComponent(
      form.username
    )}; expires=${expires.toUTCString()}; path=/`;

    // "Log in" immediately
    onLogin({ firstName: form.username, email: form.email });
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          {/* Email */}
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
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
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

          <button type="submit">Register</button>

          {/* Switch to Login */}
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
