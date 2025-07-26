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

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  // Validation
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

  try {
    // ✅ NEW: Send user data to backend
    const res = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      credentials: 'include', // allows cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        email: form.email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert('Registration failed: ' + data.error);
      return;
    }

    // ✅ Set cookie manually (optional — could also be set by server)
    const expires = new Date();
    if (rememberMe) expires.setDate(expires.getDate() + 12);
    else expires.setTime(expires.getTime() + 30 * 60000);

    document.cookie = `skyUser=${encodeURIComponent(
      form.username
    )}; expires=${expires.toUTCString()}; path=/`;

    // ✅ Log in locally (simulate auth success)
    onLogin({ firstName: form.username, email: form.email });

    alert('Registration successful!');
  } catch (err) {
    console.error('Registration error:', err);
    alert('Registration failed (network error)');
  }
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
