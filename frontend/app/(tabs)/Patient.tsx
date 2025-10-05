import React, { useState } from 'react';
import { User, MapPin, Phone, MessageCircle, Camera, Send, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface PatientProps {
  onNavigate: (screen: string) => void;
}

interface UserData {
  age: string;
  gender: string;
  country: string;
  city: string;
  phone: string;
  email: string;
}

interface Message {
  type: 'user' | 'ai';
  text: string;
}

interface ReportData {
  severity: string;
  symptoms: string[];
  duration: string;
}

const Patient: React.FC<PatientProps> = ({ onNavigate }) => {
  const [currentScreen, setCurrentScreen] = useState('info');
  const [userData, setUserData] = useState<UserData>({
    age: '',
    gender: '',
    country: '',
    city: '',
    phone: '',
    email: ''
  });
  const [chatMessages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [reportData, setReportData] = useState<ReportData | null>(null);

  // Patient Info Collection Screen
  const PatientInfoScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate('landing')}
          className="mb-4 text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Home
        </button>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center mb-8">
            <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mr-4">
              <User className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Basic Information</h2>
              <p className="text-gray-600">Anonymous & Secure</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  placeholder="25"
                  value={userData.age}
                  onChange={(e) => setUserData({...userData, age: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                <select
                  value={userData.gender}
                  onChange={(e) => setUserData({...userData, gender: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <MapPin size={16} className="mr-2" /> Location *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Country"
                  value={userData.country}
                  onChange={(e) => setUserData({...userData, country: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={userData.city}
                  onChange={(e) => setUserData({...userData, city: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Phone size={16} className="mr-2" /> Phone Number *
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={userData.phone}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={() => {
              if (userData.age && userData.gender && userData.country && userData.phone) {
                setCurrentScreen('chat');
                setMessages([{
                  type: 'ai',
                  text: "Hello! I'm here to help you today. Please describe your medical concern in detail. Include when it started, what symptoms you're experiencing, and any relevant information."
                }]);
              } else {
                alert('Please fill in all required fields');
              }
            }}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg mt-8"
          >
            Continue to Consultation
          </button>
        </div>
      </div>
    </div>
  );

  // Chat Interface Screen
  const ChatScreen = () => {
    const handleSend = () => {
      if (currentInput.trim()) {
        setMessages([...chatMessages, { type: 'user', text: currentInput }]);
        
        setTimeout(() => {
          const responses = [
            "Thank you for sharing. How long have you been experiencing these symptoms?",
            "I see. Does anything make it better or worse?",
            "Have you taken any medication? If yes, what was the response?",
            "Thank you. Preparing your report for medical student review..."
          ];
          
          const aiMsgCount = chatMessages.filter(m => m.type === 'ai').length;
          
          if (aiMsgCount < 3) {
            setMessages(prev => [...prev, { type: 'ai', text: responses[aiMsgCount] }]);
          } else {
            setMessages(prev => [...prev, { type: 'ai', text: responses[3] }]);
            setTimeout(() => {
              setReportData({
                severity: 'low',
                symptoms: ['Headache', 'Fatigue', 'Mild fever'],
                duration: '3 days'
              });
              setCurrentScreen('status');
            }, 2000);
          }
        }, 1000);
        
        setCurrentInput('');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-blue-600 text-white p-5 shadow-lg">
          <button onClick={() => onNavigate('landing')} className="mb-2 text-blue-100 hover:text-white">
            ← Back
          </button>
          <div className="flex items-center">
            <MessageCircle size={28} className="mr-3" />
            <div>
              <h2 className="text-xl font-bold">Medical Consultation</h2>
              <p className="text-sm text-blue-100">AI Assistant</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 shadow-md rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-blue-600">
              <Camera size={24} />
            </button>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your symptoms..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Status Screen
  const StatusScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => onNavigate('landing')} className="mb-4 text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Home
        </button>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center mb-6">
            <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mr-4">
              <Activity className="text-yellow-600" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Under Review</h2>
              <p className="text-yellow-600 font-medium">Medical student reviewing your case</p>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
            <p className="text-blue-800 flex items-center">
              <AlertTriangle className="mr-2 flex-shrink-0" size={20} />
              Your report is being reviewed by a verified medical student volunteer. Estimated wait: 15-30 minutes
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Preliminary Assessment</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Severity:</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">LOW</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Reported Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {reportData?.symptoms.map((s, i) => (
                  <span key={i} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Duration</h3>
              <p className="text-gray-700">{reportData?.duration}</p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => {
                setCurrentScreen('final');
                setTimeout(() => {}, 1000);
              }}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
            >
              View Sample Final Report
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Final Report Screen
  const FinalReportScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => onNavigate('landing')} className="mb-4 text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Home
        </button>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="text-green-600" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Consultation Complete</h2>
              <p className="text-green-600 font-medium">Reviewed & Approved</p>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 mb-6">
            <p className="text-green-800 flex items-center">
              <CheckCircle className="mr-2 flex-shrink-0" size={20} />
              Your report has been reviewed and approved. A copy has been sent to your phone/email.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Final Diagnosis</h3>
              <p className="text-gray-700">Possible viral infection - Common cold</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Recommendations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Rest and stay hydrated
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Monitor symptoms for next 48 hours
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Over-the-counter pain relief as needed
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Seek immediate care if symptoms worsen
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-2 text-lg">Reviewed by</h3>
              <p className="text-sm text-gray-700">Medical Student Volunteer</p>
              <p className="text-xs text-gray-500">Supervised by Licensed Physician</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('landing')}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg mt-8"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div>
      {currentScreen === 'info' && <PatientInfoScreen />}
      {currentScreen === 'chat' && <ChatScreen />}
      {currentScreen === 'status' && <StatusScreen />}
      {currentScreen === 'final' && <FinalReportScreen />}
    </div>
  );
};

export default Patient;