import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

function VerifyOtp() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!verified) return;

    const timer = setTimeout(() => navigate('/login'), 2000);
    return () => clearTimeout(timer);
  }, [verified, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/verify-otp', { email, otp });
      setVerified(true);
      setSuccess('Email verified!');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/resend-otp', { email });
      setSuccess('OTP resent');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="page-centered">
      <div className="card auth-card">
        <h1>Verify Email</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              id="otp"
              className="input"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p>{success}</p>}
          <button type="submit" className="btn btn-primary" disabled={verified}>
            Verify
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleResend}
            disabled={verified}
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
