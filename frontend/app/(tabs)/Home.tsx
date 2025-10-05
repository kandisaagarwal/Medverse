import React from 'react';
import '../styles/home.css';
import { Stethoscope, UserCog, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/parallax-scroll-view';

const Home: React.FC = () => {
  return (
    <ParallaxScrollView
      headerImage={
        <div className="parallax-header">
          <div className="header-gradient">
            <Stethoscope size={100} color="white" style={{ opacity: 0.9 }} />
          </div>
        </div>
      }
      headerBackgroundColor={{ light: '#3b82f6', dark: '#1e40af' }}
    >
      <div className="home-container">
        {/* Hero Content */}
        <section className="hero-section">
          <div className="hero-content">
            
            <h1 className="hero-title">
              Mediverse<br />
              <span className="gradient-text">Redefined</span>
            </h1>
            
            <p className="hero-description">
              Connect with medical student volunteers for free, anonymous consultations. 
              Professional guidance, accessible to everyone, anywhere.
            </p>
          </div>
        </section>

        {/* Portal Buttons */}
        <section className="portals-section">
          <h2 className="section-title">Choose Your Portal</h2>
          
          <div className="portal-grid">
            {/* Patient Portal */}
            <button 
              className="portal-card patient-portal"
              onClick={() => router.push('/(tabs)/Patient')}
            >
              <div className="portal-icon-wrapper">
                <div className="portal-icon-bg"></div>
                <Stethoscope className="portal-icon" size={28} />
              </div>
              <div className="portal-content">
                <h3 className="portal-title">Patient</h3>
                <p className="portal-description">
                  Get medical guidance and support from qualified volunteers
                </p>
              </div>
              <div className="portal-arrow">
                <ArrowRight size={20} />
              </div>
            </button>

            {/* Volunteer Portal */}
            <button 
              className="portal-card volunteer-portal"
              onClick={() => router.push('/(tabs)/VolunteerLogin')}
            >
              <div className="portal-icon-wrapper">
                <div className="portal-icon-bg"></div>
                <UserCog className="portal-icon" size={28} />
              </div>
              <div className="portal-content">
                <h3 className="portal-title">Volunteer</h3>
                <p className="portal-description">
                  Review cases and provide medical expertise to those in need
                </p>
              </div>
              <div className="portal-arrow">
                <ArrowRight size={20} />
              </div>
            </button>


            {/* Supervisor Portal */}
            <button 
              className="portal-card supervisor-portal"
              onClick={() => router.push('/(tabs)/Supervisor')}
            >
              <div className="portal-icon-wrapper">
                <div className="portal-icon-bg"></div>
                <ShieldCheck className="portal-icon" size={28} />
              </div>
              <div className="portal-content">
                <h3 className="portal-title">Supervisor</h3>
                <p className="portal-description">
                  Oversee consultations and approve medical recommendations
                </p>
              </div>
              <div className="portal-arrow">
                <ArrowRight size={20} />
              </div>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Medverse</h3>
              <p>Accessible healthcare for everyone</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Platform</h4>
                <a href="#">For Patients</a>
                <a href="#">For Volunteers</a>
                <a href="#">For Supervisors</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>⚠ For emergencies, call 911, 999, or 112 immediately</p>
            <p className="footer-copyright">© 2024 Medverse. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ParallaxScrollView>
  );
};

export default Home;



// import React from 'react';
// import '../styles/home.css';
// import { Stethoscope, UserCog, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
// import { router } from 'expo-router';
// import ParallaxScrollView from '@/components/parallax-scroll-view';

// const Home: React.FC = () => {
//   return (
//     <ParallaxScrollView
//       headerImage={
//         <div className="parallax-header">
//           <div className="header-gradient">
//             <Stethoscope size={60} color="white" style={{ opacity: 0.9 }} />
//           </div>
//         </div>
//       }
//       headerBackgroundColor={{ light: '#3b82f6', dark: '#1e40af' }}
//     >
//       <div className="home-container">
//         {/* Hero Content */}
//         <section className="hero-section">
//           <div className="hero-content">
//             <div className="hero-badge">
//               <Smartphone size={16} />
//               <span>Introducing Medverse Mobile</span>
//             </div>
            
//             <h1 className="hero-title">
//               Healthcare Access,<br />
//               <span className="gradient-text">Redefined</span>
//             </h1>
            
//             <p className="hero-description">
//               Connect with medical student volunteers for free, anonymous consultations. 
//               Professional guidance, accessible to everyone, anywhere.
//             </p>
            
//             <div className="hero-stats">
//               <div className="stat-item">
//                 <div className="stat-number">24/7</div>
//                 <div className="stat-label">Available</div>
//               </div>
//               <div className="stat-divider"></div>
//               <div className="stat-item">
//                 <div className="stat-number">100%</div>
//                 <div className="stat-label">Anonymous</div>
//               </div>
//               <div className="stat-divider"></div>
//               <div className="stat-item">
//                 <div className="stat-number">Free</div>
//                 <div className="stat-label">Forever</div>
//               </div>
//             </div>
//           </div>

//           <div className="hero-image">
//             <div className="phone-mockup">
//               <div className="phone-screen">
//                 <div className="screen-header">
//                   <div className="screen-dot"></div>
//                   <div className="screen-dot"></div>
//                   <div className="screen-dot"></div>
//                 </div>
//                 <div className="screen-content">
//                   <Stethoscope size={48} color="#3b82f6" />
//                 </div>
//               </div>
//             </div>
//             <div className="floating-card card-1">
//               <div className="card-icon">💊</div>
//               <div className="card-text">Quick Consultation</div>
//             </div>
//             <div className="floating-card card-2">
//               <div className="card-icon">🩺</div>
//               <div className="card-text">Expert Review</div>
//             </div>
//           </div>
//         </section>

//         {/* Portal Buttons */}
//         <section className="portals-section">
//           <h2 className="section-title">Choose Your Portal</h2>
          
//           <div className="portal-grid">
//             {/* Patient Portal */}
//             <button 
//               className="portal-card patient-portal"
//               onClick={() => router.push('/(tabs)/Patient')}
//             >
//               <div className="portal-icon-wrapper">
//                 <div className="portal-icon-bg"></div>
//                 <Stethoscope className="portal-icon" size={28} />
//               </div>
//               <div className="portal-content">
//                 <h3 className="portal-title">Patient</h3>
//                 <p className="portal-description">
//                   Get medical guidance and support from qualified volunteers
//                 </p>
//               </div>
//               <div className="portal-arrow">
//                 <ArrowRight size={20} />
//               </div>
//             </button>

//             {/* Volunteer Portal */}
//             <button 
//               className="portal-card volunteer-portal"
//               onClick={() => router.push('/(tabs)/Volunteer')}
//             >
//               <div className="portal-icon-wrapper">
//                 <div className="portal-icon-bg"></div>
//                 <UserCog className="portal-icon" size={28} />
//               </div>
//               <div className="portal-content">
//                 <h3 className="portal-title">Volunteer</h3>
//                 <p className="portal-description">
//                   Review cases and provide medical expertise to those in need
//                 </p>
//               </div>
//               <div className="portal-arrow">
//                 <ArrowRight size={20} />
//               </div>
//             </button>

//             {/* Supervisor Portal */}
//             <button 
//               className="portal-card supervisor-portal"
//               onClick={() => router.push('/(tabs)/Supervisor')}
//             >
//               <div className="portal-icon-wrapper">
//                 <div className="portal-icon-bg"></div>
//                 <ShieldCheck className="portal-icon" size={28} />
//               </div>
//               <div className="portal-content">
//                 <h3 className="portal-title">Supervisor</h3>
//                 <p className="portal-description">
//                   Oversee consultations and approve medical recommendations
//                 </p>
//               </div>
//               <div className="portal-arrow">
//                 <ArrowRight size={20} />
//               </div>
//             </button>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="footer">
//           <div className="footer-content">
//             <div className="footer-brand">
//               <h3>Medverse</h3>
//               <p>Accessible healthcare for everyone</p>
//             </div>
            
//             <div className="footer-links">
//               <div className="footer-column">
//                 <h4>Platform</h4>
//                 <a href="#">For Patients</a>
//                 <a href="#">For Volunteers</a>
//                 <a href="#">For Supervisors</a>
//               </div>
//               <div className="footer-column">
//                 <h4>Support</h4>
//                 <a href="#">Help Center</a>
//                 <a href="#">Privacy Policy</a>
//                 <a href="#">Terms of Service</a>
//               </div>
//             </div>
//           </div>
          
//           <div className="footer-bottom">
//             <p>⚠️ For emergencies, call 911, 999, or 112 immediately</p>
//             <p className="footer-copyright">© 2024 Medverse. All rights reserved.</p>
//           </div>
//         </footer>
//       </div>
//     </ParallaxScrollView>
//   );
// };

// export default Home;