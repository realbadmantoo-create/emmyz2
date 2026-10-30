import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../locales/translations';
import { SubmissionType, SubmissionCategory, SubmissionUrgency } from '../types';
import { X, Send, Lightbulb, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

interface SubmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (ticketNumber: string) => void;
}

export const SubmissionFormModal: React.FC<SubmissionFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { language, currentUser, createSubmission } = useApp();
  const t = translations[language];

  const [type, setType] = useState<SubmissionType>('suggestion');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SubmissionCategory>('safety');
  const [urgency, setUrgency] = useState<SubmissionUrgency>('normal');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError(language === 'rw' ? 'Shyiramo umutwe w\'igitekerezo cyangwa ikibazo' : 'Please enter a title');
      return;
    }
    if (!description.trim() || description.trim().length < 15) {
      setError(
        language === 'rw'
          ? 'Sobanura mu buryo burambuye (byibura amagambo 15)'
          : 'Please provide at least 15 characters of detail'
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const newSub = createSubmission({
        type,
        title,
        description,
        category,
        urgency,
        isAnonymous,
      });

      // Reset
      setTitle('');
      setDescription('');
      setIsSubmitting(false);
      onSuccess(newSub.ticketNumber);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error creating submission');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {t.submissionFormTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.submissionFormDesc}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Type Selector (Segmented buttons) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              {t.submissionTypePrompt}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('suggestion')}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                  type === 'suggestion'
                    ? 'border-teal-600 bg-teal-50/50 text-teal-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg ${type === 'suggestion' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold block">{t.suggestion}</span>
                  <span className="text-[11px] text-slate-500 block">
                    {language === 'rw' ? 'Icyo kunoza imikorere n\'umusaruro' : 'Improvement or innovation proposal'}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setType('issue')}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                  type === 'issue'
                    ? 'border-rose-600 bg-rose-50/50 text-rose-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg ${type === 'issue' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold block">{t.issue}</span>
                  <span className="text-[11px] text-slate-500 block">
                    {language === 'rw' ? 'Imbangamizi, umutekano, cyangwa ikibazo' : 'Workplace issue or grievance'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Title input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {language === 'rw' ? 'Umutwe w\'igitekerezo / ikibazo' : 'Title / Subject'} *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={t.titlePlaceholder}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Category & Urgency Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.categoryLabel}
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as SubmissionCategory)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
              >
                <option value="safety">{t.safety}</option>
                <option value="operations">{t.operations}</option>
                <option value="equipment">{t.equipment}</option>
                <option value="welfare">{t.welfare}</option>
                <option value="management">{t.management}</option>
                <option value="other">{t.other}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.urgencyLabel}
              </label>
              <select
                value={urgency}
                onChange={e => setUrgency(e.target.value as SubmissionUrgency)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
              >
                <option value="normal">{t.normal}</option>
                <option value="high">{t.high}</option>
                <option value="urgent">{t.urgent}</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.descLabel} *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={t.descPlaceholder}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Anonymous toggle */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <input
              type="checkbox"
              id="anonymous-toggle"
              checked={isAnonymous}
              onChange={e => setIsAnonymous(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="anonymous-toggle" className="text-xs cursor-pointer select-none">
              <span className="font-semibold text-slate-900 block flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                {t.anonymousToggle}
              </span>
              <span className="text-slate-500 block mt-0.5">
                {t.anonymousDesc}
              </span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 rounded-lg transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? '...' : t.submit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
