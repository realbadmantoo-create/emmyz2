import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../locales/translations';
import { Shield, User as UserIcon, LogOut, Globe, PlusCircle, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  currentTab: 'overview' | 'submissions' | 'admin' | 'guidelines';
  setCurrentTab: (tab: 'overview' | 'submissions' | 'admin' | 'guidelines') => void;
  onOpenNewSubmission: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenNewSubmission,
  onOpenAuth,
}) => {
  const { currentUser, language, setLanguage, logout, switchUser, users } = useApp();
  const t = translations[language];

  const adminUsers = users.filter(u => u.role === 'admin');
  const employeeUsers = users.filter(u => u.role === 'employee');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Top Demo Quick Switch Bar */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white tracking-wide">QS CETU LTD</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">
            {currentUser 
              ? `${currentUser.name} (${currentUser.role === 'admin' ? t.roleAdmin : t.roleEmployee} · ${currentUser.employeeId})`
              : t.portalSubtitle}
          </span>
        </div>

        {/* 1-Click Role Switcher for instant testing */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden sm:inline">{t.switchRole}:</span>
          <button
            onClick={() => {
              if (adminUsers[0]) {
                switchUser(adminUsers[0].id);
                setCurrentTab('admin');
              }
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              currentUser?.role === 'admin'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title="Switch directly to Admin mode"
          >
            🛡️ Admin (Mukamana Grace)
          </button>
          <button
            onClick={() => {
              if (employeeUsers[0]) {
                switchUser(employeeUsers[0].id);
                setCurrentTab('overview');
              }
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              currentUser?.role === 'employee'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title="Switch directly to Employee mode"
          >
            👷 Umukozi (Mugisha J.P.)
          </button>
        </div>
      </div>

      {/* Main Navigation (3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentTab(currentUser?.role === 'admin' ? 'admin' : 'overview')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
              <img
                src="/src/assets/images/qs_cetu_logo_mark_1793392206256.jpg"
                alt="QS CETU LTD Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-950 tracking-tight leading-none block">
                QS CETU LTD
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5 tracking-tight">
                {language === 'rw' ? 'Urubuga rw\'Abakozi n\'Ubuyobozi' : 'Staff & Grievance Portal'}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line text) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setCurrentTab('overview')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              currentTab === 'overview'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.home}
          </button>

          {/* Submissions tab ONLY visible when logged in */}
          {currentUser && (
            <button
              onClick={() => setCurrentTab('submissions')}
              className={`whitespace-nowrap transition-colors pb-0.5 ${
                currentTab === 'submissions'
                  ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.submissions}
            </button>
          )}

          {/* Admin Panel tab ONLY visible when logged in as admin */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-0.5 ${
                currentTab === 'admin'
                  ? 'text-amber-800 font-semibold border-b-2 border-amber-600'
                  : 'text-amber-900 hover:text-amber-950'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-600" />
              {t.adminPanel}
            </button>
          )}

          <button
            onClick={() => setCurrentTab('guidelines')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              currentTab === 'guidelines'
                ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.guidelines}
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'rw' ? 'en' : 'rw')}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
            title="Hindura Ururimi / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{language === 'rw' ? 'RW' : 'EN'}</span>
            <span className="text-[10px] text-slate-400 font-normal">
              ({language === 'rw' ? 'Ikinyarwanda' : 'English'})
            </span>
          </button>

          {/* Primary Action Button */}
          {currentUser && (
            <button
              onClick={onOpenNewSubmission}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              {t.newSubmission}
            </button>
          )}

          {/* Auth State */}
          {currentUser ? (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <div className="text-right hidden lg:block">
                <span className="text-xs font-semibold text-slate-900 block leading-tight truncate max-w-[140px]">
                  {currentUser.name}
                </span>
                <span className="text-[11px] text-slate-500 block leading-none truncate max-w-[140px]">
                  {currentUser.department}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-1.5 text-slate-500 hover:text-rose-600 rounded-md hover:bg-slate-100 transition-colors"
                title={t.logout}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <UserIcon className="w-3.5 h-3.5" />
              {t.login}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
