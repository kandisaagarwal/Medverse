import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, X, User, MapPin, FileText, AlertCircle, Clock } from 'lucide-react';

interface SupervisorProps {
  onNavigate: (screen: string) => void;
}

interface PrescriptionRequest {
  id: number;
  caseId: number;
  volunteerId: string;
  volunteerName: string;
  patientAge: number;
  patientGender: string;
  patientLocation: string;
  symptoms: string[];
  diagnosis: string;
  recommendedMedication: string;
  dosage: string;
  notes: string;
  timeAgo: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Supervisor: React.FC<SupervisorProps> = ({ onNavigate }) => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionRequest[]>([
    {
      id: 2001,
      caseId: 1001,
      volunteerId: 'MS-2024-001',
      volunteerName: 'Medical Student Volunteer #1',
      patientAge: 28,
      patientGender: 'Male',
      patientLocation: 'USA, New York',
      symptoms: ['Headache', 'Fatigue', 'Mild fever'],
      diagnosis: 'Viral infection (common cold/flu)',
      recommendedMedication: 'Ibuprofen',
      dosage: '200mg every 6 hours as needed for pain/fever',
      notes: 'Patient has been experiencing symptoms for 3 days. No contraindications noted. Standard OTC dosing recommended.',
      timeAgo: '15 minutes ago',
      status: 'pending'
    },
    {
      id: 2002,
      caseId: 1002,
      volunteerId: 'MS-2024-003',
      volunteerName: 'Medical Student Volunteer #3',
      patientAge: 45,
      patientGender: 'Female',
      patientLocation: 'Canada, Toronto',
      symptoms: ['Sore throat', 'Cough', 'Runny nose'],
      diagnosis: 'Upper respiratory tract infection',
      recommendedMedication: 'Acetaminophen + Dextromethorphan',
      dosage: 'Acetaminophen 500mg + Dextromethorphan 15mg every 4-6 hours',
      notes: 'Cold symptoms for 2 days. Recommend combination for symptom relief.',
      timeAgo: '32 minutes ago',
      status: 'pending'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<PrescriptionRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (id: number) => {
    setPrescriptions(prescriptions.map(p => 
      p.id === id ? { ...p, status: 'approved' as const } : p
    ));
    alert('Prescription approved! Patient will receive notification.');
    setSelectedRequest(null);
  };

  const handleReject = (id: number) => {
    if (rejectionReason.trim()) {
      setPrescriptions(prescriptions.map(p => 
        p.id === id ? { ...p, status: 'rejected' as const } : p
      ));
      alert(`Prescription rejected. Reason: ${rejectionReason}`);
      setSelectedRequest(null);
      setRejectionReason('');
    } else {
      alert('Please provide a reason for rejection');
    }
  };

  const pendingRequests = prescriptions.filter(p => p.status === 'pending');
  const processedRequests = prescriptions.filter(p => p.status !== 'pending');

  // Dashboard View
  const DashboardView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-4">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => onNavigate('landing')} className="mb-4 text-purple-600 hover:text-purple-700 font-medium">
          ← Back to Home
        </button>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                <ShieldCheck className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Prescription Approvals</h2>
                <p className="text-gray-600">{pendingRequests.length} pending approvals</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Supervisor</p>
              <p className="font-bold text-gray-800">Dr. Sarah Smith, MD</p>
              <p className="text-xs text-gray-500">Johns Hopkins Med School</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">{pendingRequests.length}</p>
              <p className="text-sm text-yellow-600 font-medium">Pending</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-700">
                {prescriptions.filter(p => p.status === 'approved').length}
              </p>
              <p className="text-sm text-green-600 font-medium">Approved Today</p>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-700">
                {prescriptions.filter(p => p.status === 'rejected').length}
              </p>
              <p className="text-sm text-red-600 font-medium">Rejected</p>
            </div>
          </div>

          {/* Pending Requests */}
          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pending Requests</h3>
              {pendingRequests.map((request) => (
                <div key={request.id} className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition bg-purple-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-gray-800">
                        Prescription Request #{request.id}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock size={14} className="mr-1" />
                        Submitted {request.timeAgo}
                      </p>
                    </div>
                    <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold uppercase">
                      Pending Review
                    </span>
                  </div>

                  {/* Volunteer Info */}
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Requested by:</p>
                    <p className="text-gray-800 font-medium">{request.volunteerName}</p>
                    <p className="text-sm text-gray-600">ID: {request.volunteerId}</p>
                  </div>

                  {/* Patient Info */}
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Patient Information (Case #{request.caseId})</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-gray-400" />
                        <div>
                          <span className="text-gray-600">Age:</span>
                          <span className="ml-2 font-medium">{request.patientAge}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Gender:</span>
                        <span className="ml-2 font-medium">{request.patientGender}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <span className="font-medium text-sm">{request.patientLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Symptoms:</p>
                    <div className="flex flex-wrap gap-2">
                      {request.symptoms.map((symptom, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Diagnosis:</p>
                    <p className="text-gray-800">{request.diagnosis}</p>
                  </div>

                  {/* Recommended Medication */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-bold text-blue-800 mb-3 flex items-center">
                      <FileText className="mr-2" size={18} />
                      Recommended OTC Medication
                    </p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-blue-700 font-semibold">Medication:</span>
                        <p className="text-blue-900 font-bold text-lg">{request.recommendedMedication}</p>
                      </div>
                      <div>
                        <span className="text-sm text-blue-700 font-semibold">Dosage:</span>
                        <p className="text-blue-900">{request.dosage}</p>
                      </div>
                    </div>
                  </div>

                  {/* Volunteer Notes */}
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Volunteer Notes:</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{request.notes}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="flex-1 bg-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition"
                    >
                      Review in Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">All Caught Up!</h3>
              <p className="text-gray-600">No pending prescription requests at this time.</p>
            </div>
          )}

          {/* Processed Requests Section */}
          {processedRequests.length > 0 && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recently Processed</h3>
              <div className="space-y-3">
                {processedRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">Request #{request.id} - Case #{request.caseId}</p>
                      <p className="text-sm text-gray-600">{request.recommendedMedication}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      request.status === 'approved' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Detail Review Modal/View
  const DetailReviewView = () => {
    if (!selectedRequest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Review Prescription Request</h2>
            <button 
              onClick={() => setSelectedRequest(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-2">Request Details</h3>
              <p className="text-sm text-gray-600">Request ID: #{selectedRequest.id}</p>
              <p className="text-sm text-gray-600">Case ID: #{selectedRequest.caseId}</p>
              <p className="text-sm text-gray-600">Volunteer: {selectedRequest.volunteerName}</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-3">Prescription</h3>
              <p className="text-blue-900 font-bold text-lg mb-2">{selectedRequest.recommendedMedication}</p>
              <p className="text-blue-800 text-sm">{selectedRequest.dosage}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-2">Rejection Reason (if rejecting)</h3>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide a detailed reason for rejection..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24 resize-none"
              />
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mr-2 flex-shrink-0 mt-1" size={20} />
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Only over-the-counter medications can be approved. Any prescription requiring a written prescription must be rejected with instructions for the patient to see a local physician.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleApprove(selectedRequest.id)}
              className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center"
            >
              <CheckCircle size={20} className="mr-2" />
              Approve Prescription
            </button>
            <button
              onClick={() => handleReject(selectedRequest.id)}
              className="flex-1 bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center"
            >
              <X size={20} className="mr-2" />
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DashboardView />
      {selectedRequest && <DetailReviewView />}
    </>
  );
};

export default Supervisor;