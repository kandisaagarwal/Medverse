import React from 'react';
import { Globe, Users, Shield, Stethoscope, UserCog, ShieldCheck, AlertTriangle } from 'lucide-react';

interface HomeProps {
  onNavigate: (screen: string, userType: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="text-center pt-16 pb-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          HealthConnect
        </h1>
        <p className="text-2xl text-gray-700 font-medium mb-3">
          Free Anonymous Medical Consultation
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Connecting patients with medical student volunteers for accessible healthcare guidance
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Global Access */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Globe className="text-blue-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Access</h3>
            <p className="text-gray-600 leading-relaxed">
              Get medical guidance from anywhere in the world, completely free and anonymous.
            </p>
          </div>

          {/* Medical Volunteers */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Users className="text-purple-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Medical Volunteers</h3>
            <p className="text-gray-600 leading-relaxed">
              Med school students supervised by licensed physicians review every case.
            </p>
          </div>

          {/* Secure & Private */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure & Private</h3>
            <p className="text-gray-600 leading-relaxed">
              No names required. Your privacy is our priority with encrypted communications.
            </p>
          </div>
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Patient Portal */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 shadow-2xl text-white hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <Stethoscope className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-3">Patient</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Need medical advice? Get help now
            </p>
            <button
              onClick={() => onNavigate('patientInfo', 'patient')}
              className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-lg"
            >
              Start Consultation
            </button>
          </div>

          {/* Volunteer Portal */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 shadow-2xl text-white hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <UserCog className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-3">Volunteer</h2>
            <p className="text-green-100 mb-8 text-lg">
              Medical student? Help review cases
            </p>
            <button
              onClick={() => onNavigate('volunteerDashboard', 'volunteer')}
              className="w-full bg-white text-green-600 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-lg"
            >
              Review Cases
            </button>
          </div>

          {/* Supervisor Portal */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-8 shadow-2xl text-white hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-3">Supervisor</h2>
            <p className="text-purple-100 mb-8 text-lg">
              Approve prescriptions & oversee
            </p>
            <button
              onClick={() => onNavigate('supervisorDashboard', 'supervisor')}
              className="w-full bg-white text-purple-600 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition shadow-lg"
            >
              Supervisor Login
            </button>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-red-50 border-t border-red-100 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-red-800 font-medium flex items-center justify-center">
            <AlertTriangle size={20} className="mr-2" />
            For emergencies, call your local emergency services immediately (911, 999, 112)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;