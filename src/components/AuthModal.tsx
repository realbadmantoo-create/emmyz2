import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../locales/translations';
import { X, LogIn, UserPlus, Shield, User, Check, Briefcase, Mail, Phone, Hash } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { language, login, register, users, switchUser } = useApp();
  const t = translations[language];

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmployeeId, setRegEmployeeId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regDepartment, setRegDepartment] = useState('Civil Works & Engineering');
  const [regTitle, setRegTitle] = useState('');
  const [regRole, setRegRole] = useState<'employee' | 'admin'>('employee');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrId.trim()) {
      setError(language === 'rw' ? 'Shyiramo imeyili cyangwa nimero y\'akazi' : 'Please provide email or Employee ID');
      return;
    }

    const success = login(emailOrId);
    if (success) {
      setError(null);
      onClose();
    } else {
      setError(
        language === 'rw'
          ? 'Nta konti ibonetse ifite iyi meyili cyangwa nimero y\'akazi. Gerageza gukoresha konti z\'igerageza ziri hasi.'
          : 'No account found with this email or Employee ID. Try using the quick demo logins below.'
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
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error creating account');
    }
  };

  const demoAdmin = users.find(u => u.role === 'admin') || users[0];
  const demoEmp1 = users.find(u => u.role === 'employee') || users[2];
  const demoEmp2 = users.filter(u => u.role === 'employee')[1] || users[3];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Tabs */}
        <div className="px-6 pt-5 pb-0 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
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
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`pb-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                mode === 'login'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              {t.login}
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`pb-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                mode === 'register'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              {t.register}
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
              {error}
            </div>
          )}

          {mode === 'login' ? (
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
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                {t.login}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.employeeId}
                  </label>
                  <input
                    type="text"
                    value={regEmployeeId}
                    onChange={e => setRegEmployeeId(e.target.value)}
                    placeholder="e.g., QS-ENG-110"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
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
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.department}
                  </label>
                  <select
                    value={regDepartment}
                    onChange={e => setRegDepartment(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                  >
                    <option value="Civil Works & Engineering">Civil Works & Engineering</option>
                    <option value="Procurement & Logistics">Procurement & Logistics</option>
                    <option value="Health, Safety & Environment">Health & Safety (HSE)</option>
                    <option value="Operations & Site Maintenance">Operations & Site</option>
                    <option value="Finance & Accounting">Finance & Accounting</option>
                    <option value="Human Resources">Human Resources</option>
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
                    placeholder="e.g. Site Supervisor"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>
              </div>

              {/* Role selection if registering an admin or employee */}
              <div className="pt-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Ubwoko bwa Konti' : 'Account Type'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('employee')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-medium border text-center transition-colors ${
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
                    className={`py-1.5 px-3 rounded-lg text-xs font-medium border text-center transition-colors ${
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
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm mt-2"
              >
                {t.register}
              </button>
            </form>
          )}

          {/* Quick 1-Click Demo Accounts */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2.5">
              {t.demoAccountsTitle}
            </span>

            <div className="space-y-1.5">
              {demoAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    switchUser(demoAdmin.id);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-lg border border-amber-200/90 bg-amber-50/50 hover:bg-amber-100/60 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-amber-800">
                        {demoAdmin.name} ({t.roleAdmin})
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono-numbers">
                        {demoAdmin.email} · {demoAdmin.employeeId}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-700 bg-white border border-amber-200 px-2 py-0.5 rounded shadow-2xs">
                    {t.login}
                  </span>
                </button>
              )}

              {demoEmp1 && (
                <button
                  type="button"
                  onClick={() => {
                    switchUser(demoEmp1.id);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-lg border border-blue-200/80 bg-blue-50/40 hover:bg-blue-100/50 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-blue-800">
                        {demoEmp1.name} ({demoEmp1.title})
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono-numbers">
                        {demoEmp1.email} · {demoEmp1.employeeId}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded shadow-2xs">
                    {t.login}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
