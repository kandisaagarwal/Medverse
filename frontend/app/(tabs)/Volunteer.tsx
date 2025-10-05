// import React from 'react';
// import '../styles/volunteer.css';
// import { ClipboardList, User, MapPin, Calendar } from 'lucide-react';
// import { router } from 'expo-router';
// import ParallaxScrollView from '@/components/parallax-scroll-view';

// interface Case {
//   id: number;
//   age: number;
//   gender: string;
//   location: string;
//   severity: 'low' | 'medium' | 'high';
//   symptoms: string[];
//   description: string;
//   duration: string;
//   timeAgo: string;
//   aiDiagnosis: string;
// }

// const Volunteer: React.FC = () => {
//   // Mock case data
//   const cases: Case[] = [
//     {
//       id: 1001,
//       age: 28,
//       gender: 'Male',
//       location: 'USA, New York',
//       severity: 'low',
//       symptoms: ['Headache', 'Fatigue', 'Mild fever'],
//       description: 'Patient reports experiencing persistent headache for the past 3 days, accompanied by general fatigue and low-grade fever (99.5°F). No other significant symptoms. Patient has been taking over-the-counter pain medication with minimal relief.',
//       duration: '3 days',
//       timeAgo: '12 minutes ago',
//       aiDiagnosis: 'Possible viral infection (common cold or flu). Low severity - no immediate concerns.'
//     },
//     {
//       id: 1002,
//       age: 45,
//       gender: 'Female',
//       location: 'Canada, Toronto',
//       severity: 'low',
//       symptoms: ['Sore throat', 'Cough', 'Runny nose'],
//       description: 'Experiencing typical cold symptoms including scratchy throat, dry cough, and nasal congestion. Started 2 days ago. No difficulty breathing or high fever.',
//       duration: '2 days',
//       timeAgo: '25 minutes ago',
//       aiDiagnosis: 'Upper respiratory tract infection (common cold). Symptoms consistent with viral infection.'
//     },
//     {
//       id: 1003,
//       age: 35,
//       gender: 'Other',
//       location: 'UK, London',
//       severity: 'medium',
//       symptoms: ['Abdominal pain', 'Nausea', 'Loss of appetite'],
//       description: 'Moderate abdominal discomfort in the lower right region, accompanied by nausea and decreased appetite. Pain started yesterday evening and has been constant.',
//       duration: '1 day',
//       timeAgo: '45 minutes ago',
//       aiDiagnosis: 'Possible gastroenteritis or digestive issue. Medium severity - monitor closely.'
//     }
//   ];

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'low':
//         return 'severity-low';
//       case 'medium':
//         return 'severity-medium';
//       case 'high':
//         return 'severity-high';
//       default:
//         return 'severity-default';
//     }
//   };

//   const handleReviewCase = (caseItem: Case) => {
//     router.push({
//       pathname: '/(tabs)/volunteer-review',
//       params: { caseData: JSON.stringify(caseItem) }
//     });
//   };

//   return (
//     <ParallaxScrollView
//       headerImage={
//         <div className="parallax-header">
//           <div className="header-gradient">
//             <ClipboardList size={80} color="white" style={{ opacity: 0.9 }} />
//           </div>
//         </div>
//       }
//       headerBackgroundColor={{ light: '#16a34a', dark: '#15803d' }}
//     >
//       <div className="volunteer-container">
//         <div className="content-wrapper">
//           <div className="card-container">
//             <div className="header-section">
//               <div className="header-left">
//                 <div className="icon-circle green">
//                   <ClipboardList size={28} />
//                 </div>
//                 <div>
//                   <h2 className="page-title">Case Queue</h2>
//                   <p className="page-subtitle">{cases.length} cases pending review</p>
//                 </div>
//               </div>
//               <div className="header-right">
//                 <p className="label">Volunteer ID</p>
//                 <p className="value">MS-2024-001</p>
//               </div>
//             </div>

//             <div className="cases-list">
//               {cases.map((caseItem) => (
//                 <div key={caseItem.id} className="case-card">
//                   <div className="case-header">
//                     <div>
//                       <h3 className="case-title">Case #{caseItem.id}</h3>
//                       <p className="case-time">
//                         <Calendar size={14} />
//                         Submitted {caseItem.timeAgo}
//                       </p>
//                     </div>
//                     <span className={`severity-badge ${getSeverityColor(caseItem.severity)}`}>
//                       {caseItem.severity} Severity
//                     </span>
//                   </div>
                  
//                   <div className="case-info-grid">
//                     <div className="info-item">
//                       <User size={16} />
//                       <div>
//                         <span className="info-label">Age:</span>
//                         <span className="info-value">{caseItem.age}</span>
//                       </div>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">Gender:</span>
//                       <span className="info-value">{caseItem.gender}</span>
//                     </div>
//                     <div className="info-item">
//                       <MapPin size={16} />
//                       <span className="info-value">{caseItem.location}</span>
//                     </div>
//                   </div>

//                   <div className="symptoms-section">
//                     <h4 className="symptoms-title">Symptoms:</h4>
//                     <div className="symptoms-list">
//                       {caseItem.symptoms.map((symptom, idx) => (
//                         <span key={idx} className="symptom-tag">
//                           {symptom}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <p className="case-description">{caseItem.description}</p>
                  
//                   <button 
//                     onClick={() => handleReviewCase(caseItem)}
//                     className="review-button"
//                   >
//                     Review Case
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </ParallaxScrollView>
//   );
// };

// export default Volunteer;

import React, { useState, useEffect } from 'react';
import '../styles/volunteer.css';
import { ClipboardList, User, MapPin, Calendar, RefreshCw } from 'lucide-react';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/parallax-scroll-view';

interface Case {
  id: number;
  age: number;
  gender: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  description: string;
  duration: string;
  timeAgo: string;
  aiDiagnosis: string;
}

const Volunteer: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volunteerId, setVolunteerId] = useState<string | null>(null);

  // Fetch cases from backend API
  const fetchCases = async () => {
  const demoVolunteerId = '68e243ce4bbacf29c6509377';
  try {
    const response = await fetch('http://localhost:3000/volunteer/getFirst', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        volunteer_id: demoVolunteerId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cases');
    }

    const data = await response.json();

    if (data.report) {
      const transformedCase: Case = {
        id: data.report._id || data.report.id || 1001,
        age: data.report.age || 0,
        gender: data.report.gender || 'Unknown',
        location: data.report.location
          ? `(${data.report.location.coordinates[1]}, ${data.report.location.coordinates[0]})`
          : 'Unknown',
        severity: data.report.severity || 'low',
        symptoms: data.report.symptoms || [],
        description: data.report.description || 'No description provided',
        duration: data.report.duration || 'Unknown',
        timeAgo: 'Recently', // You might want to calculate this from createdAt
        aiDiagnosis: data.report.diagnosis ? data.report.diagnosis.join(', ') : 'No diagnosis yet'
      };
      setCases([transformedCase]);
    } else {
      setCases([]);
    }
  } catch (err) {
      console.error('Error fetching cases:', err);
      
      // Fallback to demo data if backend fails
      const fallbackCases: Case[] = [
        {
          id: 1001,
          age: 28,
          gender: 'Male',
          location: 'USA, New York',
          severity: 'low',
          symptoms: ['Headache', 'Fatigue', 'Mild fever'],
          description: 'Patient reports experiencing persistent headache for the past 3 days, accompanied by general fatigue and low-grade fever (99.5°F). No other significant symptoms. Patient has been taking over-the-counter pain medication with minimal relief.',
          duration: '3 days',
          timeAgo: '12 minutes ago',
          aiDiagnosis: 'Possible viral infection (common cold or flu). Low severity - no immediate concerns.'
        }
      ];
      
      setCases(fallbackCases);
      setError('Using demo data - Backend connection failed');
    } finally {
      setIsLoading(false);
    }
  };
  // Temporary test function - add this before your useEffect
const testBackendConnection = async () => {
  try {
    console.log('🧪 Testing backend connection...');
    
    // Test 1: Simple GET request to test route
    const testResponse = await fetch('http://localhost:3000/volunteer/test');
    const testData = await testResponse.json();
    console.log('✅ Backend test route works:', testData);
    
    return true;
  } catch (error) {
    console.error('❌ Backend connection test failed:', error);
    return false;
  }
};

useEffect(() => {
  // Test connection first, then fetch cases
  testBackendConnection().then(success => {
    if (success) {
      console.log('🎉 Backend connection successful, fetching cases...');
      fetchCases();
    } else {
      console.log('💥 Backend connection failed');
      // You could set fallback data here immediately
    }
  });
}, []);

  useEffect(() => {
    fetchCases();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'severity-low';
      case 'medium':
        return 'severity-medium';
      case 'high':
        return 'severity-high';
      default:
        return 'severity-default';
    }
  };

  const handleReviewCase = (caseItem: Case) => {
    router.push({
      pathname: '/(tabs)/volunteer-review',
      params: { caseData: JSON.stringify(caseItem) }
    });
  };

  const handleRefresh = () => {
    fetchCases();
  };

  return (
    <ParallaxScrollView
      headerImage={
        <div className="parallax-header">
          <div className="header-gradient">
            <ClipboardList size={80} color="white" style={{ opacity: 0.9 }} />
          </div>
        </div>
      }
      headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
    >
      <div className="volunteer-container">
        <div className="content-wrapper">
          <div className="card-container">
            <div className="header-section">
              <div className="header-left">
                <div className="icon-circle green">
                  <ClipboardList size={28} />
                </div>
                <div>
                  <h2 className="page-title">Case Queue</h2>
                  <p className="page-subtitle">
                    {isLoading ? 'Loading...' : `${cases.length} cases pending review`}
                  </p>
                </div>
              </div>
              <div className="header-right">
                <p className="label">Volunteer ID</p>
                <p className="value">MS-2024-001</p>
                <button 
                  onClick={handleRefresh}
                  className="refresh-button"
                  disabled={isLoading}
                >
                  <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
                  Refresh
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <p>{error}</p>
                <button onClick={handleRefresh} className="retry-button">
                  Try Again
                </button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="loading-state">
                <RefreshCw size={32} className="spinning" />
                <p>Loading cases...</p>
              </div>
            )}

            {/* Cases List */}
            {!isLoading && (
              <div className="cases-list">
                {cases.length === 0 ? (
                  <div className="empty-state">
                    <p>No cases pending review</p>
                    <button onClick={handleRefresh} className="refresh-button">
                      Check for new cases
                    </button>
                  </div>
                ) : (
                  cases.map((caseItem) => (
                    <div key={caseItem.id} className="case-card">
                      <div className="case-header">
                        <div>
                          <h3 className="case-title">Case #{caseItem.id}</h3>
                          <p className="case-time">
                            <Calendar size={14} />
                            Submitted {caseItem.timeAgo}
                          </p>
                        </div>
                        <span className={`severity-badge ${getSeverityColor(caseItem.severity)}`}>
                          {caseItem.severity} Severity
                        </span>
                      </div>
                      
                      <div className="case-info-grid">
                        <div className="info-item">
                          <User size={16} />
                          <div>
                            <span className="info-label">Age:</span>
                            <span className="info-value">{caseItem.age}</span>
                          </div>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Gender:</span>
                          <span className="info-value">{caseItem.gender}</span>
                        </div>
                        <div className="info-item">
                          <MapPin size={16} />
                          <span className="info-value">{caseItem.location}</span>
                        </div>
                      </div>

                      <div className="symptoms-section">
                        <h4 className="symptoms-title">Symptoms:</h4>
                        <div className="symptoms-list">
                          {caseItem.symptoms.map((symptom, idx) => (
                            <span key={idx} className="symptom-tag">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="case-description">{caseItem.description}</p>
                      
                      <button 
                        onClick={() => handleReviewCase(caseItem)}
                        className="review-button"
                      >
                        Review Case
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ParallaxScrollView>
  );
};

export default Volunteer;