import React from 'react';
import { SubmissionStatus, SubmissionType, SubmissionUrgency, Language } from '../types';
import { translations } from '../locales/translations';

interface StatusProps {
  status: SubmissionStatus;
  lang: Language;
}

export const StatusIndicator: React.FC<StatusProps> = ({ status, lang }) => {
  const t = translations[lang];

  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          {t.pending}
        </span>
      );
    case 'in_progress':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {t.in_progress}
        </span>
      );
    case 'resolved':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {t.resolved}
        </span>
      );
    case 'implemented':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-700">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          {t.implemented}
        </span>
      );
    default:
      return null;
  }
};

interface TypeProps {
  type: SubmissionType;
  lang: Language;
}

export const TypeIndicator: React.FC<TypeProps> = ({ type, lang }) => {
  const t = translations[lang];
  if (type === 'suggestion') {
    return (
      <span className="text-xs font-semibold text-teal-800 tracking-tight">
        {t.suggestion}
      </span>
    );
  }
  return (
    <span className="text-xs font-semibold text-rose-800 tracking-tight">
      {t.issue}
    </span>
  );
};

interface UrgencyProps {
  urgency: SubmissionUrgency;
  lang: Language;
}

export const UrgencyIndicator: React.FC<UrgencyProps> = ({ urgency, lang }) => {
  const t = translations[lang];
  switch (urgency) {
    case 'urgent':
      return <span className="text-xs font-medium text-rose-600">{t.urgent}</span>;
    case 'high':
      return <span className="text-xs font-medium text-orange-600">{t.high}</span>;
    case 'normal':
    default:
      return <span className="text-xs font-normal text-slate-500">{t.normal}</span>;
  }
};
