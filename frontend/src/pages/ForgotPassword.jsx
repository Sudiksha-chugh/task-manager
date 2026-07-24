import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/password/forgot-password', { email });
      setSuccess('Check your email for a reset link');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="page-centered">
      <div className="card auth-card">
        <h1>Forgot Password</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p>{success}</p>}
          <button type="submit" className="btn btn-primary">
            Send Reset Link
          </button>
        </form>
        <Link className="back-link" to="/login">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
