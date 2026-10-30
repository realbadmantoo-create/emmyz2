import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../locales/translations';
import { Submission, SubmissionStatus } from '../types';
import { StatusIndicator, TypeIndicator, UrgencyIndicator } from './StatusIndicator';
import {
  X,
  Send,
  ShieldCheck,
  Building,
  User,
  Clock,
  MessageSquare,
  Lock,
  CheckCircle,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface SubmissionDetailModalProps {
  submission: Submission | null;
  onClose: () => void;
}

export const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  submission,
  onClose,
}) => {
  const { currentUser, language, addResponse, updateStatus, updateInternalNotes } = useApp();
  const t = translations[language];

  const [replyMessage, setReplyMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<SubmissionStatus | ''>('');
  const [isOfficialResolution, setIsOfficialResolution] = useState(false);
  const [internalNotes, setInternalNotes] = useState(submission?.internalNotes || '');
  const [isNotesSaved, setIsNotesSaved] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  if (!submission) return null;

  const isAdmin = currentUser?.role === 'admin';
  const hasOfficialResolution = submission.responses.some(r => r.isOfficialResolution);

  const formattedDate = new Date(submission.createdAt).toLocaleDateString(
    language === 'rw' ? 'rw-RW' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    setIsSubmittingReply(true);
    addResponse(
      submission.id,
      replyMessage,
      selectedStatus || undefined,
      isAdmin ? isOfficialResolution : false
    );
    setReplyMessage('');
    setIsSubmittingReply(false);
    setIsOfficialResolution(false);
    setSelectedStatus('');
  };

  const handleSaveNotes = () => {
    updateInternalNotes(submission.id, internalNotes);
    setIsNotesSaved(true);
    setTimeout(() => setIsNotesSaved(false), 2000);
  };

  const handleStatusChange = (newStatus: SubmissionStatus) => {
    updateStatus(submission.id, newStatus);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div>
            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-1">
              <span className="font-mono-numbers text-slate-700 font-semibold">
                {submission.ticketNumber}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <TypeIndicator type={submission.type} lang={language} />
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{t[submission.category]}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <UrgencyIndicator urgency={submission.urgency} lang={language} />
            </div>

            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {submission.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <StatusIndicator status={submission.status} lang={language} />
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Submission details block */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4.5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-700">
                  {submission.isAnonymous ? (
                    <span className="italic text-slate-500">{t.anonymousAuthor}</span>
                  ) : (
                    <span>
                      {submission.author.name} · {submission.author.department}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 font-mono-numbers">
                <Clock className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
              {submission.description}
            </div>

            {submission.assignedTo && (
              <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-500 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.assignedToLabel}:</span>
                <span className="font-medium text-slate-700">{submission.assignedTo}</span>
              </div>
            )}
          </div>

          {/* Admin Fast Status Controls */}
          {isAdmin && (
            <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  {language === 'rw' ? 'Ibiro by\'Ubuyobozi: Hindura Imiterere' : 'Admin Action Desk: Status Controls'}
                </span>
                <span className="text-[11px] text-amber-800">
                  {language === 'rw' ? 'Kanda ku miterere ukeneye guhindura:' : 'Change ticket lifecycle state:'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    submission.status === 'pending'
                      ? 'bg-amber-600 text-white font-semibold shadow-xs'
                      : 'bg-white border border-amber-200 text-amber-900 hover:bg-amber-100/50'
                  }`}
                >
                  {t.pending}
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('in_progress')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    submission.status === 'in_progress'
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'bg-white border border-blue-200 text-blue-900 hover:bg-blue-100/50'
                  }`}
                >
                  {t.in_progress}
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('resolved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    submission.status === 'resolved'
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'bg-white border border-emerald-200 text-emerald-900 hover:bg-emerald-100/50'
                  }`}
                >
                  {t.resolved}
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('implemented')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    submission.status === 'implemented'
                      ? 'bg-violet-600 text-white font-semibold shadow-xs'
                      : 'bg-white border border-violet-200 text-violet-900 hover:bg-violet-100/50'
                  }`}
                >
                  {t.implemented}
                </button>
              </div>

              {/* Internal Admin Notes */}
              <div className="pt-2 border-t border-amber-200/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-amber-950 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-600" />
                    {t.internalNotesTitle}
                  </span>
                  <span className="text-[10px] text-amber-700 italic">
                    {t.internalNotesDesc}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={internalNotes}
                    onChange={e => setInternalNotes(e.target.value)}
                    placeholder={t.internalNotesPlaceholder}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-amber-300/80 rounded-md text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="px-3 py-1.5 text-xs font-semibold bg-amber-800 hover:bg-amber-900 text-white rounded-md transition-colors shrink-0"
                  >
                    {isNotesSaved ? '✓ ' + (language === 'rw' ? 'Byabitswe' : 'Saved') : t.saveNotes}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Timeline / Responses */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-700 tracking-tight flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>{t.timeline}</span>
                <span className="text-slate-400 font-normal font-mono-numbers">
                  ({submission.responses.length})
                </span>
              </h3>
            </div>

            {submission.responses.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <AlertCircle className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                <p className="text-xs text-slate-600 font-medium">
                  {t.noResponsesYet}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {language === 'rw'
                    ? 'Ubuyobozi burasuzuma ubu busabe, igisubizo kizatanga amakuru arambuye hano.'
                    : 'Management will provide official responses and action updates directly in this thread.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {submission.responses.map(resp => {
                  const isOfficial = resp.isOfficialResolution;
                  const isRespAdmin = resp.authorRole === 'admin';
                  const respDate = new Date(resp.createdAt).toLocaleDateString(
                    language === 'rw' ? 'rw-RW' : 'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  );

                  return (
                    <div
                      key={resp.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isOfficial
                          ? 'bg-emerald-50/70 border-emerald-300'
                          : isRespAdmin
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-blue-50/40 border-blue-200/70'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">
                            {resp.authorName}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-600 text-[11px]">
                            {resp.authorTitle}
                          </span>
                          {isOfficial && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              {t.officialResponse}
                            </span>
                          )}
                        </div>
                        <span className="font-mono-numbers text-[11px] text-slate-500">
                          {respDate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                        {resp.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer: Admin Response Desk vs Employee Read-Only Notice */}
        {isAdmin ? (
          <form
            onSubmit={handleSendReply}
            className="p-4 border-t border-slate-200 bg-amber-50/40 space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-slate-700">
              <span className="font-bold flex items-center gap-1.5 text-amber-950">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                {language === 'rw'
                  ? 'Ibiro by\'Ubuyobozi: Tanga Igisubizo cyemewe cya QS CETU LTD'
                  : 'Management Response Desk: Issue Official Resolution'}
              </span>

              <label className="flex items-center gap-1.5 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  checked={isOfficialResolution}
                  onChange={e => setIsOfficialResolution(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-emerald-800 font-medium">
                  {language === 'rw' ? 'Kemeza nk\'igisubizo cyemewe (Official Resolution)' : 'Mark as official resolution'}
                </span>
              </label>
            </div>

            <div className="flex gap-2">
              <textarea
                rows={2}
                required
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
                placeholder={
                  language === 'rw'
                    ? 'Andika igisubizo cy\'ubuyobozi ku bibazo cyangwa igitekerezo cy\'umukozi...'
                    : 'Type official response or action taken by QS CETU LTD management...'
                }
                className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={isSubmittingReply || !replyMessage.trim()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 self-end shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'rw' ? 'Ohereza Igisubizo' : 'Send Response'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {submission.responses.length > 0
                  ? language === 'rw'
                    ? 'Ubuyobozi bwa QS CETU LTD bwasubije iki cyifuzo/kibazo. Reba igisubizo cyabo cyose haruguru.'
                    : 'QS CETU LTD management has answered this submission. Review their official response above.'
                  : language === 'rw'
                  ? 'Iki kibazo/igitekerezo kiri mu murongo wo gusuzumwa n\'ubuyobozi. Igisubizo cyabo kizarangizwa kikagaragazwa hano.'
                  : 'This ticket is currently under review by management. Official response will appear here once finalized.'}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors shrink-0"
            >
              {language === 'rw' ? 'Funga' : 'Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
