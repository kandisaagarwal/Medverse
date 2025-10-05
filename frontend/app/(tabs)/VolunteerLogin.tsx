import React, { useState } from 'react';
import '../styles/volunteer-login.css';
import { UserCog, Mail, Building2, MapPin, LogIn } from 'lucide-react';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/parallax-scroll-view';

const VolunteerLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    supervisorEmail: '',
    city: '',
    country: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.supervisorEmail.trim()) {
      newErrors.supervisorEmail = 'Supervisor email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.supervisorEmail)) {
      newErrors.supervisorEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('not valid')
      return;
    }
    console.log('valid')

    setIsLoading(true);

    try {
      // Prepare data for backend
      const volunteerData = {
        name: formData.name,
        school: formData.school || undefined,
        supervisorEmail: formData.supervisorEmail,
        city: formData.city,
        country: formData.country,
      };

      // Make API call to backend
    //   const API_BASE = 'http://172.16.212.243';
    //   const response = await fetch(`${API_BASE}/volunteer/addVolunteer`, {
    const response = await fetch(`http://localhost:3000/volunteer/addVolunteer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store volunteer info (you might want to use AsyncStorage or context)
      // For now, just navigate to volunteer page
      router.push('/(tabs)/Volunteer');
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
        },
        (error) => {
          alert('Unable to get location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <ParallaxScrollView
      headerImage={
        <div className="parallax-header">
          <div className="header-gradient">
            <UserCog size={80} color="white" style={{ opacity: 0.9 }} />
          </div>
        </div>
      }
      headerBackgroundColor={{ light: '#16a34a', dark: '#15803d' }}
    >
      <div className="login-container">
        <div className="login-wrapper">
          <button onClick={() => router.push('/')} className="back-button">
            ← Back to Home
          </button>

          <div className="login-card">
            <div className="login-header">
              <div className="icon-circle green">
                <UserCog size={32} />
              </div>
              <h2 className="login-title">Volunteer Login</h2>
              <p className="login-subtitle">Enter your details to access the case queue</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Name Field */}
              <div className="form-group">
                <label className="form-label">
                  <UserCog size={18} />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* School Field */}
              <div className="form-group">
                <label className="form-label">
                  <Building2 size={18} />
                  Medical School (Optional)
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="Enter your medical school"
                  className="form-input"
                />
              </div>

              {/* Supervisor Email Field */}
              <div className="form-group">
                <label className="form-label">
                  <Mail size={18} />
                  Supervisor Email *
                </label>
                <input
                  type="email"
                  name="supervisorEmail"
                  value={formData.supervisorEmail}
                  onChange={handleChange}
                  placeholder="supervisor@example.com"
                  className={`form-input ${errors.supervisorEmail ? 'error' : ''}`}
                />
                {errors.supervisorEmail && <span className="error-message">{errors.supervisorEmail}</span>}
              </div>

              {/* Location Fields */}
              <div className="location-section">
                <label className="form-label">
                  <MapPin size={18} />
                  Location (Optional)
                </label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="location-button"
                >
                  Get Current Location
                </button>
                
                <div className="location-grid">
                <div className="form-group">
                    <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="form-input"
                    />
                </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? (
                  'Logging in...'
                ) : (
                  <>
                    <LogIn size={20} />
                    Login & Access Cases
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>* Required fields</p>
              <p>Your location helps match you with nearby patients</p>
            </div>
          </div>
        </div>
      </div>
    </ParallaxScrollView>
  );
};

export default VolunteerLogin;