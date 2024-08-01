import React, { useState } from 'react';
import axios from '../core/axiosInstance'; // Axios'u kullanacağız
import './UserForm.scss'; // CSS dosyanız

export default function UserForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // API'ye POST isteği gönderiyoruz
        const response = await axios.post('/api/auth/login', { username, password });
        // Başarılı girişten sonra token'ı localStorage'a kaydedebiliriz
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('token', response.data.token); // Eğer token dönüyorsa
        // Yönlendirme veya başarılı işlem sonrası aksiyon alabilirsiniz
        window.location.href = '/'; // Ana sayfaya yönlendir
      } catch (error) {
        setApiError('Giriş başarısız, lütfen bilgilerinizi kontrol edin.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (username.length < 6 || username.length > 30) {
      errors.username = 'Username must be between 6 and 30 characters long.';
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
    return errors;
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          {errors.username && <small className="error-text">{errors.username}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {errors.password && <small className="error-text">{errors.password}</small>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        {apiError && <div className="api-error">{apiError}</div>}
      </form>
    </div>
  );
}
