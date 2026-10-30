import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../locales/translations';
import {
  Shield,
  LogIn,
  UserPlus,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Building2,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  EyeOff,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { language, login, register, users, switchUser } = useApp();
  const t = translations[language];

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmployeeId, setRegEmployeeId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regDepartment, setRegDepartment] = useState('Civil Works & Engineering');
  const [regTitle, setRegTitle] = useState('');
  const [regRole, setRegRole] = useState<'employee' | 'admin'>('employee');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrId.trim()) {
      setError(language === 'rw' ? 'Shyiramo imeyili cyangwa nimero y\'akazi' : 'Please provide email or Employee ID');
      return;
    }

    const success = login(emailOrId);
    if (!success) {
      setError(
        language === 'rw'
          ? 'Nta konti ibonetse ifite iyi meyili cyangwa nimero y\'akazi. Koresha konti z\'igerageza ziri hasi cyangwa ufungure konti nshya.'
          : 'Account not found. Please check your credentials or select a demo account below.'
      );
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      setError(language === 'rw' ? 'Uzuza imyirondoro yose isabwa' : 'Please complete all required fields');
      return;
    }

    const empId = regEmployeeId.trim() || `QS-EMP-${Math.floor(100 + Math.random() * 900)}`;

    try {
      register({
        name: regName,
        employeeId: empId,
        email: regEmail,
        phone: regPhone || '+250 788 000 000',
        department: regDepartment,
        title: regTitle || (language === 'rw' ? 'Umukozi wa QS CETU' : 'Staff Engineer'),
        role: regRole,
      });
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Error creating account');
    }
  };

  const demoAdmin = users.find(u => u.role === 'admin') || users[0];
  const demoEmp1 = users.find(u => u.role === 'employee') || users[2];

  return (
    <div className="py-6 space-y-12">
      {/* Hero Banner & Split Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Company Presentation & Value Props */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 text-white text-xs font-semibold tracking-wide shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>QS CETU LTD · Staff & Admin Gateway</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {language === 'rw'
                ? 'Urubuga rw\'Abakozi rwo Gutanga Ibitekerezo n\'Ibibazo'
                : 'Staff Voice, Grievances & Suggestion Platform'}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              {language === 'rw'
                ? 'Muri QS CETU LTD, umukozi wese afite ijwi. Fungura konti cyangwa winjire kugira ngo utange ibitekerezo byo guteza imbere imikorere y\'akazi, umenyeshe ubuyobozi ibibazo n\'imbogamizi uhura nazo, kandi ubone ibisubizo byihuse n\'ingamba zifatika zifashwe n\'ubuyobozi bukuru.'
                : 'At QS CETU LTD, every staff member has a direct voice. Log into your account or register to submit workplace proposals, report health & safety issues, and receive official management answers and resolutions.'}
            </p>
          </div>

          {/* Headquarters Visual Showcase */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-72">
            <img
              src="/src/assets/images/qs_cetu_corporate_hero_1793392334766.jpg"
              alt="QS CETU LTD Corporate Headquarters"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-5">
              <div className="text-white text-xs">
                <span className="font-bold block text-sm">QS CETU LTD Headquarters</span>
                <span className="text-slate-300">
                  {language === 'rw'
                    ? 'Kigali, Rwanda · Civil Engineering, Infrastructure & Quality Technical Services'
                    : 'Kigali, Rwanda · Civil Engineering, Infrastructure & Quality Technical Services'}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Core Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1.5" />
              <span className="text-xs font-bold text-slate-900 block">
                {language === 'rw' ? 'Kurinda Ibanga' : 'Confidentiality'}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">
                {language === 'rw'
                  ? 'Uburenganzira bwo gutanga ikibazo mu ibanga (Anonymous)'
                  : 'Option to report grievances fully anonymously'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 mb-1.5" />
              <span className="text-xs font-bold text-slate-900 block">
                {language === 'rw' ? 'Umutekano ku Kazi' : 'Safety Priority'}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">
                {language === 'rw'
                  ? 'Ibibazo by\'umutekano bikemurwa mu masaha 24'
                  : '24-hour SLA on all site safety & health hazards'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <Lightbulb className="w-5 h-5 text-violet-600 mb-1.5" />
              <span className="text-xs font-bold text-slate-900 block">
                {language === 'rw' ? 'Ibisubizo by\'Ubuyobozi' : 'Official Action'}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">
                {language === 'rw'
                  ? 'Ibisubizo bitangwa n\'abayobozi b\'amashami'
                  : 'Verified responses from executive leadership'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Portal Access Form (Login & Register) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            {/* Form Header with Tabs */}
            <div className="p-6 border-b border-slate-200 bg-slate-50/80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    QS
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 leading-none">
                      QS CETU LTD
                    </h2>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {t.portalSubtitle}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  <Lock className="w-3 h-3 text-amber-600" />
                  <span>{language === 'rw' ? 'Kwinjira Birakenewe' : 'Login Required'}</span>
                </div>
              </div>

              {/* Segmented Tab Controls */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200/60 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setError(null);
                  }}
                  className={`py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'login'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t.login}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setError(null);
                  }}
                  className={`py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'register'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{t.register}</span>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                  {error}
                </div>
              )}

              {authMode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.emailOrId} *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={emailOrId}
                        onChange={e => setEmailOrId(e.target.value)}
                        placeholder="jeanpierre.mugisha@qscetu.rw cyangwa QS-ENG-104"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.password}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{t.login}</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="e.g., Kalisa Eric"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.employeeId}
                      </label>
                      <input
                        type="text"
                        value={regEmployeeId}
                        onChange={e => setRegEmployeeId(e.target.value)}
                        placeholder="QS-ENG-115"
                        className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.phone}
                      </label>
                      <input
                        type="text"
                        value={regPhone}
                        onChange={e => setRegPhone(e.target.value)}
                        placeholder="+250 788 123 456"
                        className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.emailOrId.split(' ')[0]} (Email) *
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      placeholder="eric.kalisa@qscetu.rw"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.department}
                      </label>
                      <select
                        value={regDepartment}
                        onChange={e => setRegDepartment(e.target.value)}
                        className="w-full px-2 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                      >
                        <option value="Civil Works & Engineering">Civil Works</option>
                        <option value="Procurement & Logistics">Procurement</option>
                        <option value="Health, Safety & Environment">Health & Safety</option>
                        <option value="Operations & Maintenance">Operations</option>
                        <option value="Finance & Administration">Finance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.jobTitle}
                      </label>
                      <input
                        type="text"
                        value={regTitle}
                        onChange={e => setRegTitle(e.target.value)}
                        placeholder="Site Engineer"
                        className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Account type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === 'rw' ? 'Ubwoko bwa Konti' : 'Role'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRegRole('employee')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                          regRole === 'employee'
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                            : 'border-slate-200 text-slate-600 bg-white'
                        }`}
                      >
                        👷 {t.roleEmployee}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegRole('admin')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                          regRole === 'admin'
                            ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold'
                            : 'border-slate-200 text-slate-600 bg-white'
                        }`}
                      >
                        🛡️ {t.roleAdmin}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs mt-2 flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{t.register}</span>
                  </button>
                </form>
              )}

              {/* 1-Click Fast Evaluation Logins */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  {t.demoAccountsTitle}
                </span>

                <div className="space-y-1.5">
                  {demoEmp1 && (
                    <button
                      type="button"
                      onClick={() => switchUser(demoEmp1.id)}
                      className="w-full text-left p-2 rounded-lg border border-blue-200/80 bg-blue-50/30 hover:bg-blue-100/50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block group-hover:text-blue-700">
                            {demoEmp1.name} ({t.roleEmployee})
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono-numbers">
                            {demoEmp1.department} · {demoEmp1.employeeId}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                        {t.login} <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  )}

                  {demoAdmin && (
                    <button
                      type="button"
                      onClick={() => switchUser(demoAdmin.id)}
                      className="w-full text-left p-2 rounded-lg border border-amber-200/90 bg-amber-50/40 hover:bg-amber-100/60 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block group-hover:text-amber-800">
                            {demoAdmin.name} ({t.roleAdmin})
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono-numbers">
                            {demoAdmin.title} · {demoAdmin.employeeId}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                        {t.login} <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
