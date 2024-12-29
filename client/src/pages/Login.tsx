import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import { UserLogin } from '../interfaces/UserLogin';

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    // Reset error message when user starts typing
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(loginData);
      localStorage.setItem('username', loginData.username || '');
      Auth.login(data.token);
      navigate('/'); // Redirect to the homepage or dashboard
    } catch (err) {
      console.error('Failed to login:', err);
      setError('Incorrect username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-3" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-4 fw-bold">Login</h1>

          <form onSubmit={handleSubmit} aria-label="Login Form">
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label fw-bold">
                Username
              </label>
              <input
                id="username"
                className="form-control"
                type="text"
                name="username"
                value={loginData.username || ''}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                name="password"
                value={loginData.password || ''}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-bold"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account?{' '}
            <Link to="/new-login" className="text-primary fw-bold">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;