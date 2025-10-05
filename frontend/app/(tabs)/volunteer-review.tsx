import React, { useState, useEffect } from 'react';
import '../styles/volunteer.css';
import { AlertCircle, CheckCircle, MessageSquare, FileText, X } from 'lucide-react';
import { router, useLocalSearchParams } from 'expo-router';
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

const VolunteerReview: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [questionText, setQuestionText] = useState('');
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.caseData) {
      try {
        const caseData = JSON.parse(params.caseData as string);
        setSelectedCase(caseData);
      } catch (error) {
        console.error('Error parsing case data:', error);
      }
    }
  }, [params.caseData]);

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

const handleAccept = async () => {
  if (!selectedCase) return;

  try {
    const response = await fetch(`http://localhost:3000/volunteer/report/${selectedCase.id}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // If your backend needs a body, you can add it here
      // body: JSON.stringify({ ... })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Failed to accept report');
    }

    const data = await response.json();
    console.log('Report accepted:', data);

    alert('Case approved and sent to patient!');
    router.back();
  } catch (err: any) {
    console.error('Error accepting report:', err);
    alert(`Failed to accept report: ${err.message}`);
  }
}

  const handleAskQuestion = async () => {
    if (!selectedCase) return;

    if (questionText.trim()) {
      alert(`Question sent to patient: ${questionText}`);
      setQuestionText('');
    }

    try {
    const response = await fetch(`http://localhost:3000/volunteer/report/${selectedCase.id}/followUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // If your backend needs a body, you can add it here
      // body: JSON.stringify({ ... })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Failed to send follow up');
    }

    const data = await response.json();
    console.log('Follow up sent:', data);

    alert('Follow up sent to the assistant!');
    router.back();
  } catch (err: any) {
    console.error('Error adding folllow up to report:', err);
    alert(`Failed to add follow up to report: ${err.message}`);
  }

  };

  const handlePrescribe = () => {
    alert('Prescription request sent to supervisor for approval');
    router.back();
  };

  const handleOutOfScope = () => {
    alert('Patient has been notified to seek local medical attention');
    router.back();
  };

  if (!selectedCase) {
    return (
      <div className="volunteer-container">
        <div className="content-wrapper">
          <p>Loading case...</p>
        </div>
      </div>
    );
  }

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
            onClick={() => router.back()} 
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
              <button onClick={() => router.back()} className="action-btn cancel-btn">
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

export default VolunteerReview;