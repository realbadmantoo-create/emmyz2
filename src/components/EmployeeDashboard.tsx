import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../locales/translations';
import { Submission, SubmissionType, SubmissionStatus, SubmissionCategory } from '../types';
import { SubmissionCard } from './SubmissionCard';
import {
  PlusCircle,
  Search,
  Filter,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  FileQuestion,
} from 'lucide-react';

interface EmployeeDashboardProps {
  onOpenNewSubmission: () => void;
  onSelectSubmission: (sub: Submission) => void;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  onOpenNewSubmission,
  onSelectSubmission,
}) => {
  const { currentUser, submissions, language } = useApp();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | SubmissionType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | SubmissionStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | SubmissionCategory>('all');
  const [onlyMySubmissions, setOnlyMySubmissions] = useState(false);
  const [onlyAnswered, setOnlyAnswered] = useState(false);

  // Compute metrics
  const stats = useMemo(() => {
    const total = submissions.length;
    const pending = submissions.filter(s => s.status === 'pending').length;
    const inProgress = submissions.filter(s => s.status === 'in_progress').length;
    const resolved = submissions.filter(s => s.status === 'resolved').length;
    const implemented = submissions.filter(s => s.status === 'implemented').length;
    return { total, pending, inProgress, resolved, implemented };
  }, [submissions]);

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      // 1. My submissions filter
      if (onlyMySubmissions && currentUser && sub.author.id !== currentUser.id) {
        return false;
      }
      // 2. Only answered by management filter
      if (onlyAnswered && sub.responses.length === 0) {
        return false;
      }
      // 3. Type filter
      if (typeFilter !== 'all' && sub.type !== typeFilter) {
        return false;
      }
      // 4. Status filter
      if (statusFilter !== 'all' && sub.status !== statusFilter) {
        return false;
      }
      // 5. Category filter
      if (categoryFilter !== 'all' && sub.category !== categoryFilter) {
        return false;
      }
      // 6. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = sub.title.toLowerCase().includes(query);
        const matchDesc = sub.description.toLowerCase().includes(query);
        const matchTicket = sub.ticketNumber.toLowerCase().includes(query);
        const matchAuthor = sub.author.name.toLowerCase().includes(query);
        return matchTitle || matchDesc || matchTicket || matchAuthor;
      }
      return true;
    });
  }, [submissions, searchQuery, typeFilter, statusFilter, categoryFilter, onlyMySubmissions, onlyAnswered, currentUser]);

  return (
    <div className="space-y-6">
      {/* Role Reminder for Staff */}
      <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl flex items-center justify-between gap-3 text-xs text-blue-950">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            {language === 'rw'
              ? 'Uruhande rw\'Umukozi: Akazi kawe ni ugutanga ikibazo cyangwa igitekerezo no kureba ibyo wagisubijweho n\'ubuyobozi. Ubuyobozi bwonyine nibwo bufite inshingano zo gusubiza.'
              : 'Staff Role: You can submit issues or suggestions, and view official management answers. Executive management alone is authorized to answer and resolve.'}
          </span>
        </div>
      </div>
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white shadow-sm">
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <img
            src="/src/assets/images/qs_cetu_corporate_hero_1793392334766.jpg"
            alt="QS CETU LTD Headquarters"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative px-6 py-8 sm:px-10 sm:py-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            <Building2 className="w-4 h-4" />
            <span>QS CETU LTD · {language === 'rw' ? 'Ijwi ry\'Umukozi' : 'Staff Voice Platform'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            {language === 'rw'
              ? `Muraho neza, ${currentUser ? currentUser.name : 'Mukozi w\'Ingenzi'}!`
              : `Welcome back, ${currentUser ? currentUser.name : 'Valued Team Member'}!`}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mb-6">
            {language === 'rw'
              ? 'Muri QS CETU LTD, igitekerezo cyawe gifite agaciro gakomeye. Tanga igitekerezo cyo kunoza akazi, cyangwa utumenyeshe ikibazo uhura nacyo kugira ngo ubuyobozi bugisubize byihuse.'
              : 'At QS CETU LTD, every voice counts. Submit your operational improvements or report workplace challenges, and receive prompt responses and solutions from executive management.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewSubmission}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.newSubmission}</span>
            </button>
            <div className="text-xs text-slate-300 flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {language === 'rw' ? 'Ibisubizo byihuse mu masaha 24–48' : 'Guaranteed 24–48h SLA response'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row (Zero-pill discipline, scannable numbers with tabular-nums) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{t.totalSubmissions}</span>
            <FileQuestion className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-slate-900">
            {stats.total}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {language === 'rw' ? 'Ibibazo n\'ibitekerezo byose' : 'Total tickets logged'}
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{t.pendingCount}</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-amber-600">
            {stats.pending}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {language === 'rw' ? 'Biri ku murongo wo gusuzumwa' : 'Awaiting review'}
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{t.resolvedCount}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-emerald-600">
            {stats.resolved}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {language === 'rw' ? 'Byasubijwe n\'ubuyobozi' : 'Answered & resolved'}
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{t.implementedCount}</span>
            <Sparkles className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-violet-600">
            {stats.implemented}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {language === 'rw' ? 'Byashyizwe mu bikorwa' : 'Approved ideas in action'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Interactive Filter Segmented Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                typeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.allTypes}
            </button>
            <button
              onClick={() => setTypeFilter('suggestion')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                typeFilter === 'suggestion'
                  ? 'bg-white text-teal-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-teal-600" />
              {t.suggestions}
            </button>
            <button
              onClick={() => setTypeFilter('issue')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                typeFilter === 'issue'
                  ? 'bg-white text-rose-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              {t.issues}
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-900 transition-colors"
            />
          </div>
        </div>

        {/* Secondary filters (Category, Status, My Submissions) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-medium">{t.filterBy}:</span>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 focus:outline-hidden"
            >
              <option value="all">{t.allStatuses}</option>
              <option value="pending">{t.pending}</option>
              <option value="in_progress">{t.in_progress}</option>
              <option value="resolved">{t.resolved}</option>
              <option value="implemented">{t.implemented}</option>
            </select>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value as any)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 focus:outline-hidden"
            >
              <option value="all">{language === 'rw' ? 'Ibyiciro byose' : 'All Departments'}</option>
              <option value="safety">{t.safety}</option>
              <option value="operations">{t.operations}</option>
              <option value="equipment">{t.equipment}</option>
              <option value="welfare">{t.welfare}</option>
              <option value="management">{t.management}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyAnswered}
                onChange={e => setOnlyAnswered(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium text-emerald-900">
                {language === 'rw' ? 'Ibyasubijwe n\'ubuyobozi gusa' : 'Answered tickets only'}
              </span>
            </label>

            {currentUser && (
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyMySubmissions}
                  onChange={e => setOnlyMySubmissions(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium">
                  {language === 'rw' ? 'Ibyo natanze gusa' : 'My submissions only'}
                </span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Submissions Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-slate-500">
            <span>{language === 'rw' ? 'Ibyabonetse:' : 'Showing:'} </span>
            <span className="font-mono-numbers font-semibold text-slate-900">
              {filteredSubmissions.length}
            </span>
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
            <FileQuestion className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              {t.noSubmissionsFound}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
              {t.noSubmissionsDesc}
            </p>
            <button
              onClick={onOpenNewSubmission}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.giveFirstSubmission}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubmissions.map(sub => (
              <SubmissionCard
                key={sub.id}
                submission={sub}
                lang={language}
                onSelect={onSelectSubmission}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
