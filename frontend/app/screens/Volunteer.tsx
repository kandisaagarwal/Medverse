import React, { useState } from 'react';
import { ClipboardList, User, MapPin, Calendar, AlertCircle, CheckCircle, MessageSquare, FileText, X } from 'lucide-react';

interface VolunteerProps {
  onNavigate: (screen: string) => void;
}

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

const Volunteer: React.FC<VolunteerProps> = ({ onNavigate }) => {
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
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Queue View
  const QueueView = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => onNavigate('landing')} className="mb-4 text-green-600 hover:text-green-700 font-medium">
          ← Back to Home
        </button>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                <ClipboardList className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Case Queue</h2>
                <p className="text-gray-600">{cases.length} cases pending review</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Volunteer ID</p>
              <p className="font-bold text-gray-800">MS-2024-001</p>
            </div>
          </div>

          <div className="space-y-4">
            {cases.map((caseItem) => (
              <div key={caseItem.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-400 transition cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Case #{caseItem.id}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Submitted {caseItem.timeAgo}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityColor(caseItem.severity)}`}>
                    {caseItem.severity} Severity
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-gray-400" />
                    <div>
                      <span className="text-gray-600">Age:</span>
                      <span className="ml-2 font-medium">{caseItem.age}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Gender:</span>
                    <span className="ml-2 font-medium">{caseItem.gender}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <span className="font-medium">{caseItem.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Symptoms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.symptoms.map((symptom, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{caseItem.description}</p>
                
                <button 
                  onClick={() => {
                    setSelectedCase(caseItem);
                    setCurrentView('review');
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Review Case
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => {
              setCurrentView('queue');
              setSelectedCase(null);
            }} 
            className="mb-4 text-green-600 hover:text-green-700 font-medium flex items-center"
          >
            ← Back to Queue
          </button>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                  <FileText className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Case #{selectedCase.id}</h2>
                  <p className="text-gray-600">Review & Take Action</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${getSeverityColor(selectedCase.severity)}`}>
                {selectedCase.severity} Severity
              </span>
            </div>

            {/* Patient Info */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Patient Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Age:</span>
                  <p className="font-medium text-gray-800">{selectedCase.age} years</p>
                </div>
                <div>
                  <span className="text-gray-600">Gender:</span>
                  <p className="font-medium text-gray-800">{selectedCase.gender}</p>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <p className="font-medium text-gray-800">{selectedCase.location}</p>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <p className="font-medium text-gray-800">{selectedCase.duration}</p>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Reported Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCase.symptoms.map((symptom, idx) => (
                  <span key={idx} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Patient Description</h3>
              <p className="text-gray-700 leading-relaxed">{selectedCase.description}</p>
            </div>

            {/* AI Preliminary Diagnosis */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                <AlertCircle className="mr-2" size={20} />
                AI Preliminary Diagnosis
              </h3>
              <p className="text-gray-700">{selectedCase.aiDiagnosis}</p>
            </div>

            {/* Ask Question Section */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                <MessageSquare className="mr-2" size={20} />
                Ask Follow-up Question
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Type your question for the patient..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleAskQuestion}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Review Notes */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Your Review Notes (Optional)</h3>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add any notes or modifications to the diagnosis..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={handleAccept}
                className="bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
              >
                <CheckCircle size={20} className="mr-2" />
                Accept
              </button>
              <button
                onClick={handlePrescribe}
                className="bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Prescribe OTC
              </button>
              <button
                onClick={handleOutOfScope}
                className="bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                Out of Scope
              </button>
              <button
                onClick={() => {
                  setCurrentView('queue');
                  setSelectedCase(null);
                }}
                className="bg-gray-600 text-white py-4 rounded-lg font-semibold hover:bg-gray-700 transition flex items-center justify-center"
              >
                <X size={20} className="mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
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