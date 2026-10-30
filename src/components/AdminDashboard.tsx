import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../locales/translations';
import { Submission, SubmissionStatus, SubmissionType, SubmissionCategory, SubmissionUrgency } from '../types';
import { StatusIndicator, TypeIndicator, UrgencyIndicator } from './StatusIndicator';
import {
  Shield,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Lightbulb,
  MessageSquare,
  Users,
  Eye,
  Send,
  Sparkles,
  ArrowUpDown,
  Building,
} from 'lucide-react';

interface AdminDashboardProps {
  onSelectSubmission: (sub: Submission) => void;
  onOpenStaffDirectory: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onSelectSubmission,
  onOpenStaffDirectory,
}) => {
  const { currentUser, submissions, language, updateStatus, users } = useApp();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | SubmissionType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | SubmissionStatus>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | SubmissionUrgency>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | SubmissionCategory>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Stats computation
  const stats = useMemo(() => {
    const total = submissions.length;
    const pending = submissions.filter(s => s.status === 'pending').length;
    const inProgress = submissions.filter(s => s.status === 'in_progress').length;
    const resolved = submissions.filter(s => s.status === 'resolved').length;
    const implemented = submissions.filter(s => s.status === 'implemented').length;
    const urgentCount = submissions.filter(s => s.urgency === 'urgent' && s.status !== 'resolved').length;
    const resolutionRate = total > 0 ? Math.round(((resolved + implemented) / total) * 100) : 100;

    return { total, pending, inProgress, resolved, implemented, urgentCount, resolutionRate };
  }, [submissions]);

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      if (typeFilter !== 'all' && sub.type !== typeFilter) return false;
      if (statusFilter !== 'all' && sub.status !== statusFilter) return false;
      if (urgencyFilter !== 'all' && sub.urgency !== urgencyFilter) return false;
      if (categoryFilter !== 'all' && sub.category !== categoryFilter) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          sub.title.toLowerCase().includes(query) ||
          sub.description.toLowerCase().includes(query) ||
          sub.ticketNumber.toLowerCase().includes(query) ||
          sub.author.name.toLowerCase().includes(query) ||
          sub.author.department.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [submissions, typeFilter, statusFilter, urgencyFilter, categoryFilter, searchQuery]);

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Ticket Number', 'Type', 'Title', 'Category', 'Urgency', 'Status', 'Author', 'Department', 'Date', 'Responses Count'];
    const rows = filteredSubmissions.map(s => [
      `"${s.ticketNumber}"`,
      `"${s.type}"`,
      `"${s.title.replace(/"/g, '""')}"`,
      `"${s.category}"`,
      `"${s.urgency}"`,
      `"${s.status}"`,
      `"${s.isAnonymous ? 'Anonymous' : s.author.name}"`,
      `"${s.author.department}"`,
      `"${s.createdAt}"`,
      s.responses.length,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `QS_CETU_LTD_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Admin Executive Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>QS CETU LTD · {t.adminPanel}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {language === 'rw'
                ? 'Ibiro by\'Ubuyobozi: Gusuzuma no Gusubiza Ibibazo n\'Ibitekerezo'
                : 'Management Response & Triage Console'}
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              {language === 'rw'
                ? `Muraho Umuyobozi ${currentUser?.name}. Hano urasuzuma ubusabe bw\'abakozi ba QS CETU LTD, uhe igisubizo cy\'ubuyobozi, kandi uhindure imiterere yabwo.`
                : `Logged in as Executive Admin: ${currentUser?.name}. Review employee tickets, issue official solutions, and manage company resolutions.`}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenStaffDirectory}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4 text-slate-500" />
              <span>{t.staffDirectory}</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>{t.exportReport}</span>
            </button>
          </div>
        </div>

        {/* Admin KPI Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-medium text-slate-500 block mb-1">
              {t.totalSubmissions}
            </span>
            <span className="text-2xl font-bold font-mono-numbers text-slate-900">
              {stats.total}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70">
            <span className="text-xs font-medium text-amber-800 block mb-1">
              {t.pendingCount}
            </span>
            <span className="text-2xl font-bold font-mono-numbers text-amber-700">
              {stats.pending}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70">
            <span className="text-xs font-medium text-blue-800 block mb-1">
              {t.inProgressCount}
            </span>
            <span className="text-2xl font-bold font-mono-numbers text-blue-700">
              {stats.inProgress}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
            <span className="text-xs font-medium text-emerald-800 block mb-1">
              {t.resolvedCount}
            </span>
            <span className="text-2xl font-bold font-mono-numbers text-emerald-700">
              {stats.resolved}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/70">
            <span className="text-xs font-medium text-violet-800 block mb-1">
              {t.responseRate}
            </span>
            <span className="text-2xl font-bold font-mono-numbers text-violet-700">
              {stats.resolutionRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Urgent Alert Banner (if urgent unhandled issues exist) */}
      {stats.urgentCount > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-rose-900 block">
                {language === 'rw'
                  ? `Hari ibibazo ${stats.urgentCount} byihutirwa cyane bikeneye igisubizo cy'ubuyobozi!`
                  : `Attention: ${stats.urgentCount} critical urgency tickets require prompt management response.`}
              </span>
              <span className="text-[11px] text-rose-700">
                {language === 'rw'
                  ? 'Ibibazo birebana n\'umutekano ku kazi n\'imashini bikwiye gukemurwa bitarenze amasaha 24.'
                  : 'Site safety and high urgency grievances must be attended within SLA limits.'}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setUrgencyFilter('urgent');
              setStatusFilter('all');
            }}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors shadow-2xs"
          >
            {language === 'rw' ? 'Reba ibyihutirwa' : 'Filter Critical'}
          </button>
        </div>
      )}

      {/* Triage & Management Table Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'rw' ? 'Shakisha mu busabe, umukozi, cyangwa ishami...' : 'Search by ticket, keyword, employee, or department...'}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Quick Segment Type */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                typeFilter === 'all' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600'
              }`}
            >
              {t.allTypes}
            </button>
            <button
              onClick={() => setTypeFilter('issue')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                typeFilter === 'issue' ? 'bg-white text-rose-800 font-semibold shadow-2xs' : 'text-slate-600'
              }`}
            >
              {t.issues}
            </button>
            <button
              onClick={() => setTypeFilter('suggestion')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                typeFilter === 'suggestion' ? 'bg-white text-teal-800 font-semibold shadow-2xs' : 'text-slate-600'
              }`}
            >
              {t.suggestions}
            </button>
          </div>
        </div>

        {/* Detailed Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">{t.filterBy}:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700"
            >
              <option value="all">{t.allStatuses}</option>
              <option value="pending">{t.pending}</option>
              <option value="in_progress">{t.in_progress}</option>
              <option value="resolved">{t.resolved}</option>
              <option value="implemented">{t.implemented}</option>
            </select>

            <select
              value={urgencyFilter}
              onChange={e => setUrgencyFilter(e.target.value as any)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700"
            >
              <option value="all">{language === 'rw' ? 'Ubwihutirwe bwose' : 'All Urgency'}</option>
              <option value="normal">{t.normal}</option>
              <option value="high">{t.high}</option>
              <option value="urgent">{t.urgent}</option>
            </select>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value as any)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700"
            >
              <option value="all">{language === 'rw' ? 'Amashami yose' : 'All Categories'}</option>
              <option value="safety">{t.safety}</option>
              <option value="operations">{t.operations}</option>
              <option value="equipment">{t.equipment}</option>
              <option value="welfare">{t.welfare}</option>
              <option value="management">{t.management}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>

          <div className="ml-auto text-xs text-slate-500 font-mono-numbers">
            {filteredSubmissions.length} {language === 'rw' ? 'ibyatanzwe' : 'tickets'}
          </div>
        </div>
      </div>

      {/* Main Admin Management Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Ref & Type</th>
                <th className="py-3 px-4">Subject & Excerpt</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Submitted By</th>
                <th className="py-3 px-4">Urgency</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Replies</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    {t.noSubmissionsFound}
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map(sub => {
                  const hasOfficial = sub.responses.some(r => r.isOfficialResolution);
                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => onSelectSubmission(sub)}
                    >
                      {/* Ticket Ref & Type */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono-numbers font-semibold text-slate-900 block">
                          {sub.ticketNumber}
                        </span>
                        <div className="mt-0.5">
                          <TypeIndicator type={sub.type} lang={language} />
                        </div>
                      </td>

                      {/* Title & Description */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="font-semibold text-slate-900 block truncate group-hover:text-blue-600 transition-colors">
                          {sub.title}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                          {sub.description}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                        {t[sub.category]}
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {sub.isAnonymous ? (
                          <span className="italic text-slate-400">{t.anonymousAuthor}</span>
                        ) : (
                          <div>
                            <span className="font-medium text-slate-800 block">
                              {sub.author.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-mono-numbers">
                              {sub.author.employeeId} · {sub.author.department}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Urgency */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <UrgencyIndicator urgency={sub.urgency} lang={language} />
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusIndicator status={sub.status} lang={language} />
                      </td>

                      {/* Responses count */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-mono-numbers font-medium text-slate-600">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          <span>{sub.responses.length}</span>
                          {hasOfficial && <span className="text-emerald-600 font-bold" title="Official answer given">✓</span>}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => onSelectSubmission(sub)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-md text-[11px] transition-colors shadow-2xs"
                        >
                          <Send className="w-3 h-3" />
                          <span>{t.reply}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
