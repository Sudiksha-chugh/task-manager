import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      login(token);
      navigate('/boards');
    } else {
      navigate('/login');
    }
  }, [searchParams, login, navigate]);

  return <div className="loading">Logging you in...</div>;
}

export default AuthCallback;
