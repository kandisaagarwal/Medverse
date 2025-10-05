import React, { useState } from 'react';
import '../styles/supervisor.css';
import { ShieldCheck, CheckCircle, X, Clock } from 'lucide-react';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/parallax-scroll-view';

interface PrescriptionRequest {
  id: number;
  caseId: number;
  volunteerName: string;
  patientAge: number;
  patientGender: string;
  patientLocation: string;
  symptoms: string[];
  diagnosis: string;
  recommendedMedication: string;
  dosage: string;
  timeAgo: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Supervisor: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionRequest[]>([
    {
      id: 2001,
      caseId: 1001,
      volunteerName: 'Medical Student #1',
      patientAge: 28,
      patientGender: 'Male',
      patientLocation: 'USA, New York',
      symptoms: ['Headache', 'Fatigue', 'Mild fever'],
      diagnosis: 'Viral infection (common cold/flu)',
      recommendedMedication: 'Ibuprofen',
      dosage: '200mg every 6 hours as needed',
      timeAgo: '15 minutes ago',
      status: 'pending'
    },
    {
      id: 2002,
      caseId: 1002,
      volunteerName: 'Medical Student #3',
      patientAge: 45,
      patientGender: 'Female',
      patientLocation: 'Canada, Toronto',
      symptoms: ['Sore throat', 'Cough', 'Runny nose'],
      diagnosis: 'Upper respiratory tract infection',
      recommendedMedication: 'Acetaminophen + Dextromethorphan',
      dosage: '500mg + 15mg every 4-6 hours',
      timeAgo: '32 minutes ago',
      status: 'pending'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<PrescriptionRequest | null>(null);

  const handleApprove = (id: number) => {
    setPrescriptions(prescriptions.map(p => 
      p.id === id ? { ...p, status: 'approved' } : p
    ));
    setSelectedRequest(null);
    alert('Prescription approved!');
  };

  const handleReject = (id: number) => {
    setPrescriptions(prescriptions.map(p => 
      p.id === id ? { ...p, status: 'rejected' } : p
    ));
    setSelectedRequest(null);
    alert('Prescription rejected.');
  };

  const pendingRequests = prescriptions.filter(p => p.status === 'pending');

  return (
    <ParallaxScrollView
      headerImage={
        <div className="parallax-header">
          <div className="header-gradient">
            <ShieldCheck size={80} color="white" style={{ opacity: 0.9 }} className='shield'/>
          </div>
        </div>
      }
      headerBackgroundColor={{ light: '#7c3aed', dark: '#6d28d9' }}
    >
      <div className="supervisor-container">
        <div className="content-wrapper">
          <button onClick={() => router.push('/')} className="back-button">
            ← Back to Home
          </button>
          
          <div className="card-container">
            <div className="header-section">
              <div className="header-left">
                <div className="icon-circle purple">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h2 className="page-title">Prescription Approvals</h2>
                  <p className="page-subtitle">{pendingRequests.length} requests pending review</p>
                </div>
              </div>
              <div className="header-right">
                <p className="label">Supervisor</p>
                <p className="value">Dr. Sarah Smith</p>
              </div>
            </div>

            <div className="cases-list">
              {pendingRequests.map((request) => (
                <div key={request.id} className="case-card">
                  <div className="case-header">
                    <div>
                      <h3 className="case-title">Request #{request.id}</h3>
                      <p className="case-time">
                        <Clock size={14} />
                        Submitted {request.timeAgo}
                      </p>
                    </div>
                    <span className="status-badge pending">
                      Pending Review
                    </span>
                  </div>
                  
                  <div className="case-info-grid">
                    <div className="info-item">
                      <div>
                        <span className="info-label">Volunteer:</span>
                        <span className="info-value">{request.volunteerName}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Patient Age:</span>
                      <span className="info-value">{request.patientAge}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{request.patientLocation}</span>
                    </div>
                  </div>

                  <div className="symptoms-section">
                    <h4 className="symptoms-title">Symptoms:</h4>
                    <div className="symptoms-list">
                      {request.symptoms.map((symptom, idx) => (
                        <span key={idx} className="symptom-tag">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="diagnosis-section">
                    <h4 className="symptoms-title">Diagnosis:</h4>
                    <p className="case-description">{request.diagnosis}</p>
                  </div>

                  <div className="medication-section">
                    <h4 className="symptoms-title">Recommended Medication:</h4>
                    <p className="medication-name">{request.recommendedMedication}</p>
                    <p className="medication-dosage">{request.dosage}</p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedRequest(request)}
                    className="review-button"
                  >
                    Review Request
                  </button>
                </div>
              ))}
            </div>

            {pendingRequests.length === 0 && (
              <div className="empty-state">
                <CheckCircle size={48} className="empty-icon" />
                <h3 className="empty-title">All Caught Up!</h3>
                <p className="empty-text">No pending prescription requests.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Review Prescription</h2>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="modal-close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="info-box">
                <h3 className="info-box-title">Request Details</h3>
                <p><strong>Request ID:</strong> #{selectedRequest.id}</p>
                <p><strong>Case ID:</strong> #{selectedRequest.caseId}</p>
                <p><strong>Volunteer:</strong> {selectedRequest.volunteerName}</p>
              </div>

              <div className="info-box">
                <h3 className="info-box-title">Prescription</h3>
                <p className="medication-name-large">{selectedRequest.recommendedMedication}</p>
                <p className="medication-dosage">{selectedRequest.dosage}</p>
              </div>

              <div className="action-buttons-horizontal">
                <button
                  onClick={() => handleApprove(selectedRequest.id)}
                  className="action-btn approve-btn"
                >
                  <CheckCircle size={20} />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(selectedRequest.id)}
                  className="action-btn reject-btn"
                >
                  <X size={20} />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ParallaxScrollView>
  );
};

export default Supervisor;