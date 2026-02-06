import { useState } from 'react'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import './Login.css'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would authenticate with backend
    console.log('Form submitted:', formData)
    alert(isLogin ? 'Login successful!' : 'Registration successful!')
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    })
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Lock size={40} className="login-icon" />
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>
            {isLogin 
              ? 'Log in to access your personalized learning dashboard' 
              : 'Join us to start your journey with Nepali music'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-link">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-large login-button">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button className="social-button google-button">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path fill="#4285F4" d="M19.6 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.4c-.2 1.2-1 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"/>
              <path fill="#34A853" d="M10 20c2.7 0 4.9-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2H1.1v2.6C2.8 17.8 6.1 20 10 20z"/>
              <path fill="#FBBC05" d="M4.4 11.9c-.4-1.2-.4-2.5 0-3.7V5.6H1.1c-1.4 2.8-1.4 6.1 0 8.9l3.3-2.6z"/>
              <path fill="#EA4335" d="M10 3.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C14.9.9 12.7 0 10 0 6.1 0 2.8 2.2 1.1 5.6l3.3 2.6C5.2 5.7 7.4 3.9 10 3.9z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button className="toggle-mode-button" onClick={toggleMode}>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        <div className="admin-note">
          <p>
            <strong>Note:</strong> This is for demonstration purposes. Admin features 
            will include content management, user management, and analytics dashboards.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
