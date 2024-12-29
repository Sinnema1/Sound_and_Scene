import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewLogin } from '../api/newLogin';

const NewLogin = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    // Reset password error when user starts typing
    if (name === 'password') setPasswordError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Check password length
    if (loginData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      await createNewLogin(loginData);
      alert('Account created successfully! Please log in.');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Failed to create account:', err);
      setFormError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-3" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-4 fw-bold">Create Account</h1>
          <form onSubmit={handleSubmit} aria-label="Create Account Form">
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label fw-bold">
                Username
              </label>
              <input
                id="username"
                className="form-control"
                type="text"
                name="username"
                value={loginData.username}
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
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>

            {formError && <p className="text-danger">{formError}</p>}

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-bold"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;