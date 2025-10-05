import React, { useState } from 'react';
import '../styles/volunteer.css';
import { ClipboardList, User, MapPin, Calendar, AlertCircle, CheckCircle, MessageSquare, FileText, X } from 'lucide-react';
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
  const [currentView, setCurrentView] = useState<'queue' | 'review'>('queue');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [questionText, setQuestionText] = useState('');

  // Mock case data
  const cases: Case[] = [
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
    },
    {
      id: 1002,
      age: 45,
      gender: 'Female',
      location: 'Canada, Toronto',
      severity: 'low',
      symptoms: ['Sore throat', 'Cough', 'Runny nose'],
      description: 'Experiencing typical cold symptoms including scratchy throat, dry cough, and nasal congestion. Started 2 days ago. No difficulty breathing or high fever.',
      duration: '2 days',
      timeAgo: '25 minutes ago',
      aiDiagnosis: 'Upper respiratory tract infection (common cold). Symptoms consistent with viral infection.'
    },
    {
      id: 1003,
      age: 35,
      gender: 'Other',
      location: 'UK, London',
      severity: 'medium',
      symptoms: ['Abdominal pain', 'Nausea', 'Loss of appetite'],
      description: 'Moderate abdominal discomfort in the lower right region, accompanied by nausea and decreased appetite. Pain started yesterday evening and has been constant.',
      duration: '1 day',
      timeAgo: '45 minutes ago',
      aiDiagnosis: 'Possible gastroenteritis or digestive issue. Medium severity - monitor closely.'
    }
  ];

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

  // Queue View
  const QueueView = () => (
    <ParallaxScrollView
      headerImage={
        <div className="parallax-header">
          <div className="header-gradient">
            <ClipboardList size={80} color="white" style={{ opacity: 0.9 }} />
          </div>
        </div>
      }
      headerBackgroundColor={{ light: '#16a34a', dark: '#15803d' }}
    >
      <div className="volunteer-container">
        <div className="content-wrapper">
          <button onClick={() => router.push('/')} className="back-button">
            ← Back to Home
          </button>
          
          <div className="card-container">
            <div className="header-section">
              <div className="header-left">
                <div className="icon-circle green">
                  <ClipboardList size={28} />
                </div>
                <div>
                  <h2 className="page-title">Case Queue</h2>
                  <p className="page-subtitle">{cases.length} cases pending review</p>
                </div>
              </div>
              <div className="header-right">
                <p className="label">Volunteer ID</p>
                <p className="value">MS-2024-001</p>
              </div>
            </div>

            <div className="cases-list">
              {cases.map((caseItem) => (
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
                    onClick={() => {
                      setSelectedCase(caseItem);
                      setCurrentView('review');
                    }}
                    className="review-button"
                  >
                    Review Case
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ParallaxScrollView>
  );

  // Review View
  const ReviewView = () => {
    if (!selectedCase) return null;

    const handleAccept = () => {
      alert('Case approved and sent to patient!');
      setCurrentView('queue');
      setSelectedCase(null);
    };

    const handleAskQuestion = () => {
      if (questionText.trim()) {
        alert(`Question sent to patient: ${questionText}`);
        setQuestionText('');
      }
    };

    const handlePrescribe = () => {
      alert('Prescription request sent to supervisor for approval');
      setCurrentView('queue');
      setSelectedCase(null);
    };

    const handleOutOfScope = () => {
      alert('Patient has been notified to seek local medical attention');
      setCurrentView('queue');
      setSelectedCase(null);
    };

    return (
      <ParallaxScrollView
        headerImage={
          <div className="parallax-header">
            <div className="header-gradient">
              <FileText size={80} color="white" style={{ opacity: 0.9 }} />
            </div>
          </div>
        }
        headerBackgroundColor={{ light: '#16a34a', dark: '#15803d' }}
      >
        <div className="volunteer-container">
          <div className="content-wrapper">
            <button 
              onClick={() => {
                setCurrentView('queue');
                setSelectedCase(null);
              }} 
              className="back-button"
            >
              ← Back to Queue
            </button>
            
            <div className="card-container">
              <div className="header-section">
                <div className="header-left">
                  <div className="icon-circle green">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h2 className="page-title">Case #{selectedCase.id}</h2>
                    <p className="page-subtitle">Review & Take Action</p>
                  </div>
                </div>
                <span className={`severity-badge ${getSeverityColor(selectedCase.severity)}`}>
                  {selectedCase.severity} Severity
                </span>
              </div>

              <div className="info-box">
                <h3 className="info-box-title">Patient Information</h3>
                <div className="info-box-grid">
                  <div>
                    <span className="info-label">Age:</span>
                    <p className="info-value">{selectedCase.age} years</p>
                  </div>
                  <div>
                    <span className="info-label">Gender:</span>
                    <p className="info-value">{selectedCase.gender}</p>
                  </div>
                  <div>
                    <span className="info-label">Location:</span>
                    <p className="info-value">{selectedCase.location}</p>
                  </div>
                  <div>
                    <span className="info-label">Duration:</span>
                    <p className="info-value">{selectedCase.duration}</p>
                  </div>
                </div>
              </div>

              <div className="info-box">
                <h3 className="info-box-title">Reported Symptoms</h3>
                <div className="symptoms-list">
                  {selectedCase.symptoms.map((symptom, idx) => (
                    <span key={idx} className="symptom-tag">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="info-box">
                <h3 className="info-box-title">Patient Description</h3>
                <p className="info-text">{selectedCase.description}</p>
              </div>

              <div className="info-box ai-box">
                <h3 className="info-box-title">
                  <AlertCircle size={20} />
                  AI Preliminary Diagnosis
                </h3>
                <p className="info-text">{selectedCase.aiDiagnosis}</p>
              </div>

              <div className="info-box">
                <h3 className="info-box-title">
                  <MessageSquare size={20} />
                  Ask Follow-up Question
                </h3>
                <div className="question-input-group">
                  <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Type your question for the patient..."
                    className="text-input"
                  />
                  <button
                    onClick={handleAskQuestion}
                    className="send-button"
                  >
                    Send
                  </button>
                </div>
              </div>

              <div className="info-box">
                <h3 className="info-box-title">Your Review Notes (Optional)</h3>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add any notes or modifications to the diagnosis..."
                  className="textarea-input"
                />
              </div>

              <div className="action-buttons">
                <button onClick={handleAccept} className="action-btn accept-btn">
                  <CheckCircle size={20} />
                  Accept
                </button>
                <button onClick={handlePrescribe} className="action-btn prescribe-btn">
                  Prescribe OTC
                </button>
                <button onClick={handleOutOfScope} className="action-btn scope-btn">
                  Out of Scope
                </button>
                <button onClick={() => {
                  setCurrentView('queue');
                  setSelectedCase(null);
                }} className="action-btn cancel-btn">
                  <X size={20} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </ParallaxScrollView>
    );
  };

  return (
    <div>
      {currentView === 'queue' && <QueueView />}
      {currentView === 'review' && <ReviewView />}
    </div>
  );
};

export default Volunteer;