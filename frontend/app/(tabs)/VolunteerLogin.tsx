import React, { useState, useRef, useEffect } from 'react';
import '../styles/volunteer-login.css';
import { UserCog, Mail, Building2, MapPin, LogIn, ChevronDown, User } from 'lucide-react';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/parallax-scroll-view';

// Custom Dropdown Component
interface CustomDropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, error, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange({ target: { name: 'school', value: optionValue } } as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`custom-dropdown-button ${error ? 'error' : ''} ${isOpen ? 'open' : ''}`}
      >
        <span className={value ? 'selected-text' : 'placeholder-text'}>
          {selectedLabel}
        </span>
        <ChevronDown 
          size={20} 
          className={`chevron-icon ${isOpen ? 'rotate' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              disabled={!option.value}
              className={`custom-dropdown-option ${
                !option.value ? 'disabled' : value === option.value ? 'selected' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const VolunteerLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    supervisorEmail: '',
    city: '',
    country: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Medical school options
  const medicalSchools = [
    { value: '', label: 'Select your medical school' },
    { value: 'SFU', label: 'Simon Fraser University' },
    { value: 'UBC', label: 'University of British Columbia' },
    { value: 'UofT', label: 'University of Toronto' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.school.trim()) {
      newErrors.school = 'Medical school is required';
    }

    if (!formData.supervisorEmail.trim()) {
      newErrors.supervisorEmail = 'Supervisor email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.supervisorEmail)) {
      newErrors.supervisorEmail = 'Invalid email format';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form not valid');
      return;
    }
    console.log('Form valid');

    setIsLoading(true);

    try {
      // Prepare data for backend
      const volunteerData = {
        name: formData.name,
        email: formData.email,
        school: formData.school,
        supervisorEmail: formData.supervisorEmail,
        city: formData.city,
        country: formData.country,
      };

      // Make API call to backend
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
      
      // Navigate to volunteer page
      router.push('/(tabs)/Volunteer');
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
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
              <h2 className="login-title">Volunteer Sign-Up</h2>
              <p className="login-subtitle">Enter your details to access the case queue</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Name Field */}
              <div className="form-group">
                <label className="form-label">
                  <User size={18} />
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

              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">
                  <Mail size={18} />
                  Your Email *
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

              {/* School Field - Custom Dropdown */}
              <div className="form-group">
                <label className="form-label">
                  <Building2 size={18} />
                  Medical School *
                </label>
                <CustomDropdown
                  value={formData.school}
                  onChange={handleChange}
                  options={medicalSchools}
                  error={errors.school}
                  placeholder="Select your medical school"
                />
                {errors.school && <span className="error-message">{errors.school}</span>}
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
                  Location *
                </label>
                
                <div className="location-grid">
                  <div className="form-group">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City *"
                      className={`form-input ${errors.city ? 'error' : ''}`}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country *"
                      className={`form-input ${errors.country ? 'error' : ''}`}
                    />
                    {errors.country && <span className="error-message">{errors.country}</span>}
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
              <p>* All fields are required</p>
              <p>Your location helps match you with nearby patients</p>
            </div>
          </div>
        </div>
      </div>
    </ParallaxScrollView>
  );
};

export default VolunteerLogin;