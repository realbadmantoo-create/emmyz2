import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../locales/translations';
import { X, BookOpen, ShieldCheck, Clock, Lightbulb, CheckCircle2 } from 'lucide-react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useApp();
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-700" />
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">
                {t.guidelinesTitle}
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                QS CETU LTD Internal Governance
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

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-slate-600 leading-relaxed overflow-y-auto max-h-[75vh]">
          <p className="text-sm font-medium text-slate-800">
            {t.guidelinesP1}
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block text-xs">
                  {language === 'rw' ? '01. Igihe cyo Gusubiza (Response SLA)' : '01. Response Timelines & SLAs'}
                </span>
                <p className="mt-1">
                  {t.guidelinesPoint1}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block text-xs">
                  {language === 'rw' ? '02. Kurinda Umwirondoro w\'Umukozi (Confidentiality)' : '02. Protection & Anonymity'}
                </span>
                <p className="mt-1">
                  {t.guidelinesPoint2}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block text-xs">
                  {language === 'rw' ? '03. Ibitekerezo Byubaka (Constructive Innovation)' : '03. Constructive Proposals'}
                </span>
                <p className="mt-1">
                  {t.guidelinesPoint3}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 text-blue-900 text-xs">
            <span className="font-bold block mb-1">
              {language === 'rw' ? 'Ibiro Bikuru bya QS CETU LTD' : 'QS CETU LTD Corporate Office'}:
            </span>
            <p>
              Kigali City, Rwanda · Email: <span className="font-mono-numbers font-semibold">contact@qscetu.rw</span> · Tel: <span className="font-mono-numbers font-semibold">+250 788 000 000</span>
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 transition-colors"
          >
            {language === 'rw' ? 'Nabyumvise' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};
