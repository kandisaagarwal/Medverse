import React from 'react';
import '../styles/volunteer-login-signin.css';
import { UserCog, LogIn, UserPlus } from 'lucide-react';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/parallax-scroll-view';

const VolunteerLoginSignIn: React.FC = () => {
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
      <div className="login-signin-container">
        <div className="login-signin-wrapper">
          <button onClick={() => router.push('/')} className="back-button">
            ← Back to Home
          </button>

          <div className="login-signin-card">
            <div className="login-signin-header">
              <div className="icon-circle green">
                <UserCog size={32} />
              </div>
              <h2 className="login-signin-title">Volunteer Portal</h2>
              <p className="login-signin-subtitle">Choose your entry point</p>
            </div>

            <div className="button-group">
              {/* Sign Up Button */}
              <button 
                onClick={() => router.push('/(tabs)/VolunteerLogin')}
                className="action-button signup-button"
              >
                <div className="button-icon">
                  <UserPlus size={24} />
                </div>
                <div className="button-content">
                  <h3 className="button-title">Sign Up</h3>
                  <p className="button-description">New users - Create your volunteer account</p>
                </div>
                <div className="button-arrow">
                  →
                </div>
              </button>

              {/* Login Button */}
              <button 
                onClick={() => router.push('/(tabs)/VolunteerSignIn')}
                className="action-button login-button"
              >
                <div className="button-icon">
                  <LogIn size={24} />
                </div>
                <div className="button-content">
                  <h3 className="button-title">Login</h3>
                  <p className="button-description">Welcome back - Access your account</p>
                </div>
                <div className="button-arrow">
                  →
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ParallaxScrollView>
  );
};

export default VolunteerLoginSignIn;