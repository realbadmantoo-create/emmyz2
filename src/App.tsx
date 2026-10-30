import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { SubmissionFormModal } from './components/SubmissionFormModal';
import { SubmissionDetailModal } from './components/SubmissionDetailModal';
import { AuthModal } from './components/AuthModal';
import { StaffDirectoryModal } from './components/StaffDirectoryModal';
import { GuidelinesModal } from './components/GuidelinesModal';
import { translations } from './locales/translations';
import { Submission } from './types';
import { CheckCircle2, Shield, PlusCircle, RotateCcw, Building2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentUser, language, resetToDefaults, submissions } = useApp();
  const t = translations[language];

  const [currentTab, setCurrentTab] = useState<'overview' | 'submissions' | 'admin' | 'guidelines'>('overview');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [isNewSubmissionOpen, setIsNewSubmissionOpen] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [isStaffDirectoryOpen, setIsStaffDirectoryOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Synchronize selected submission with real-time state in context
  const selectedSubmission = selectedSubmissionId
    ? submissions.find(s => s.id === selectedSubmissionId) || null
    : null;

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSubmissionSuccess = (ticketNumber: string) => {
    setSuccessToast(
      language === 'rw'
        ? `Igitekerezo cyangwa ikibazo cyoherejwe neza! Nimero yacyo ni: ${ticketNumber}`
        : `Submission successfully recorded! Reference ID: ${ticketNumber}`
    );
    setTimeout(() => {
      setSuccessToast(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'guidelines') {
            setIsGuidelinesOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        onOpenNewSubmission={() => setIsNewSubmissionOpen(true)}
        onOpenAuth={() => handleOpenAuth('login')}
      />

      {/* Success Notification Banner */}
      {successToast && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!currentUser ? (
          /* When NOT logged in: ALL submissions and internal metrics are hidden */
          <LandingPage />
        ) : currentTab === 'admin' && currentUser.role === 'admin' ? (
          <AdminDashboard
            onSelectSubmission={(sub) => setSelectedSubmissionId(sub.id)}
            onOpenStaffDirectory={() => setIsStaffDirectoryOpen(true)}
          />
        ) : currentTab === 'admin' && currentUser.role !== 'admin' ? (
          <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              {language === 'rw' ? 'Aha hinjira Ubuyobozi (Admin) Gusa' : 'Restricted Management Access'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'rw'
                ? 'Ubu winjiye nka Staff. Kanda kuri buto yo hasi kugira ngo uhindure konti wibonere uko uruhande rwa Admin rukora.'
                : 'You are currently logged in with a staff account. Use the button below to switch to the Admin demo account.'}
            </p>
            <button
              onClick={() => {
                handleOpenAuth('login');
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-2xs"
            >
              {language === 'rw' ? 'Injira nka Admin (Mukamana Grace)' : 'Switch to Admin Demo Account'}
            </button>
          </div>
        ) : (
          /* When logged in as employee / viewing submissions */
          <EmployeeDashboard
            onOpenNewSubmission={() => setIsNewSubmissionOpen(true)}
            onSelectSubmission={(sub) => setSelectedSubmissionId(sub.id)}
          />
        )}
      </main>

      {/* Corporate Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              QS
            </div>
            <div>
              <span className="font-bold text-slate-900">QS CETU LTD</span>
              <span className="text-slate-400 ml-2">
                © {new Date().getFullYear()} · {language === 'rw' ? 'Uburenganzira bwose burabitswe' : 'All Rights Reserved'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <button
              onClick={() => setIsGuidelinesOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              {t.guidelines}
            </button>
            <span>·</span>
            <button
              onClick={() => setIsStaffDirectoryOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              {t.staffDirectory}
            </button>
            <span>·</span>
            <button
              onClick={resetToDefaults}
              className="hover:text-rose-600 transition-colors flex items-center gap-1"
              title="Reset sample data back to initial seeds"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === 'rw' ? 'Kugarura Amakuru y\'Ibanze' : 'Reset Demo Data'}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SubmissionFormModal
        isOpen={isNewSubmissionOpen}
        onClose={() => setIsNewSubmissionOpen(false)}
        onSuccess={handleSubmissionSuccess}
      />

      <SubmissionDetailModal
        submission={selectedSubmission}
        onClose={() => setSelectedSubmissionId(null)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authInitialMode}
      />

      <StaffDirectoryModal
        isOpen={isStaffDirectoryOpen}
        onClose={() => setIsStaffDirectoryOpen(false)}
      />

      <GuidelinesModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
