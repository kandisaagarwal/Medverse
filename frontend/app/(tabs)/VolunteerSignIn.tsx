import React, { useState } from 'react';
import '../styles/volunteer-signin.css';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/parallax-scroll-view';

const VolunteerSignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // Make API call to backend for sign in
        const response = await fetch(`http://localhost:3000/volunteer/isValid`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        if (!response.ok) {
          throw new Error('Sign in failed');
        }

        const data = await response.json();
        
        // Save volunteer ID (or token) locally for later use
        if (data.volunteerId) {
          localStorage.setItem("volunteerId", data.volunteerId);
        }
        
        // Navigate to volunteer dashboard
        router.push('/(tabs)/Volunteer');
        
      } catch (error) {
        console.error('Sign in error:', error);
        alert('Sign in failed. Please check your credentials and try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ParallaxScrollView
      headerImage={
        <div className="parallax-header">
          <div className="header-gradient">
            <LogIn size={80} color="white" style={{ opacity: 0.9 }} />
          </div>
        </div>
      }
      headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
    >
      <div className="signin-container">
        <div className="signin-wrapper">
          <button 
            onClick={() => router.back()} 
            className="back-button"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="signin-card">
            <div className="signin-header">
              <div className="icon-circle blue">
                <LogIn size={32} />
              </div>
              <h2 className="signin-title">Welcome Back</h2>
              <p className="signin-subtitle">Sign in to your volunteer account</p>
            </div>

            <form onSubmit={handleSubmit} className="signin-form">
              <div className="form-group">
                <label className="form-label">
                  <Mail size={18} />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={18} />
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ParallaxScrollView>
  );
};

export default VolunteerSignIn;