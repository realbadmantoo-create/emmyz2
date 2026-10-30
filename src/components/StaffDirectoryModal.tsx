import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../locales/translations';
import { X, Users, Mail, Phone, Briefcase, Shield, User } from 'lucide-react';

interface StaffDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaffDirectoryModal: React.FC<StaffDirectoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { users, language, switchUser } = useApp();
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-700" />
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">
                {t.staffDirectory}
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                QS CETU LTD · {users.length} {language === 'rw' ? 'abakozi banditswe' : 'registered personnel'}
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

        {/* List of Staff */}
        <div className="p-6 overflow-y-auto divide-y divide-slate-100 space-y-3">
          {users.map(u => {
            const isAdmin = u.role === 'admin';
            return (
              <div
                key={u.id}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isAdmin ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {u.name}
                      </span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isAdmin ? t.roleAdmin : t.roleEmployee}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                      <span className="font-medium text-slate-700">{u.title}</span>
                      <span>·</span>
                      <span>{u.department}</span>
                      <span>·</span>
                      <span className="font-mono-numbers text-slate-400">{u.employeeId}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-1 font-mono-numbers">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {u.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {u.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    switchUser(u.id);
                    onClose();
                  }}
                  className="self-end sm:self-center px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  {language === 'rw' ? 'Injira muri iyi Konti' : 'Login as this user'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
