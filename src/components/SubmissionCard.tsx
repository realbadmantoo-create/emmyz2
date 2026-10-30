import React from 'react';
import { Submission, Language } from '../types';
import { translations } from '../locales/translations';
import { StatusIndicator, TypeIndicator, UrgencyIndicator } from './StatusIndicator';
import { MessageSquare, ShieldCheck, UserCheck, Clock } from 'lucide-react';

interface SubmissionCardProps {
  submission: Submission;
  lang: Language;
  onSelect: (submission: Submission) => void;
  isAdmin?: boolean;
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({
  submission,
  lang,
  onSelect,
  isAdmin,
}) => {
  const t = translations[lang];

  const hasOfficialResolution = submission.responses.some(r => r.isOfficialResolution);
  const formattedDate = new Date(submission.createdAt).toLocaleDateString(
    lang === 'rw' ? 'rw-RW' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <article
      onClick={() => onSelect(submission)}
      className="group cursor-pointer bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm rounded-xl p-5 transition-all text-left flex flex-col justify-between"
    >
      <div>
        {/* Unboxed Header Metadata - Zero-Pill Discipline */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2.5">
          <span className="font-mono-numbers text-slate-600 font-medium">
            {submission.ticketNumber}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <TypeIndicator type={submission.type} lang={lang} />
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{t[submission.category]}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <UrgencyIndicator urgency={submission.urgency} lang={lang} />
        </div>

        {/* Primary Title */}
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
          {submission.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {submission.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <StatusIndicator status={submission.status} lang={lang} />
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Author notice */}
          <span className="text-slate-500 text-[11px]">
            {submission.isAnonymous ? (
              <span className="italic text-slate-400">{t.anonymousAuthor}</span>
            ) : (
              <span>{submission.author.name}</span>
            )}
          </span>

          {/* Response Status for Employee viewing */}
          <div className="flex items-center gap-2">
            {submission.responses.length > 0 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {lang === 'rw'
                    ? `Byasubijwe (${submission.responses.length})`
                    : `Answered (${submission.responses.length})`}
                </span>
              </span>
            ) : (
              <span className="text-[11px] text-amber-700 italic">
                {lang === 'rw' ? 'Bitegereje igisubizo' : 'Awaiting response'}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
