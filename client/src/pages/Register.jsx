import { useState } from "react";
import './Register.css';

const existingUsers = ["john", "sara", "mike"];

function Register({ onLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isPasswordStrong = (pass) => {
    return pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (existingUsers.includes(form.username.toLowerCase())) {
      newErrors.username = "This username is already taken.";
    }

    if (!isPasswordStrong(form.password)) {
      newErrors.password = "Password must be at least 8 characters long, include a capital letter and a number.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Registration successful!");
      onLogin(form.username); // simulate login
    }
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          {/* … username, email, password fields … */}

          <button type="submit">Register</button>

          <p style={{ textAlign: 'center', marginTop: 16 }}>
            Already have an account?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                // here we “log in” with whatever identifier you want,
                // for example, reuse the username field or a dummy:
                onLogin({ firstName: form.username || 'User' })
              }}
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}