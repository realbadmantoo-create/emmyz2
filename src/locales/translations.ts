import { Language } from '../types';

export const translations = {
  rw: {
    // Brand & General
    companyName: 'QS CETU LTD',
    portalSubtitle: "Urubuga rw'Abakozi n'Ubuyobozi",
    systemTagline: 'Gutanga ibitekerezo, kubaza ibibazo no kubona ibisubizo byihuse',
    home: 'Ahabanza',
    submissions: "Ibyatanzwe",
    newSubmission: 'Tanga Igitekerezo / Ikibazo',
    adminPanel: "Ibiro by'Ubuyobozi (Admin)",
    guidelines: 'Amabwiriza',
    staffDirectory: "Urutonde rw'Abakozi",
    logout: 'Sohoka',
    login: 'Injira',
    register: 'Fungura Konti',
    switchRole: 'Hindura Uruhande (Demo)',
    
    // Roles
    roleEmployee: 'Umukozi',
    roleAdmin: 'Ubuyobozi (Admin)',

    // Submission Types
    allTypes: 'Byose hamwe',
    suggestion: 'Igitekerezo',
    suggestions: 'Ibitekerezo',
    issue: 'Ikibazo cyangwa Impungenge',
    issues: 'Ibibazo',

    // Statuses
    allStatuses: 'Imiterere yose',
    pending: 'Bitegerejwe',
    in_progress: 'Biri gukorwaho',
    resolved: 'Byasubijwe / Byakemutse',
    implemented: 'Cyemejwe / Byakozwe',

    // Urgencies
    normal: 'Bisanzwe',
    high: 'Birihutirwa',
    urgent: 'Byihutirwa cyane',

    // Categories
    safety: 'Umutekano n\'Ubuzima (HSE)',
    operations: 'Imikorere n\'Umusaruro',
    equipment: 'Ibikoresho n\'Imashini',
    welfare: 'Imibereho n\'Imishahara',
    management: 'Imiyoborere n\'Itumanaho',
    other: 'Ibindi bitandukanye',

    // Actions
    searchPlaceholder: 'Shakisha mu bibazo cyangwa ibitekerezo...',
    submit: 'Ohereza',
    cancel: 'Hagarika',
    reply: 'Subiza',
    sendReply: 'Ohereza Igisubizo',
    filterBy: 'Yungurura',
    exportReport: 'Kuramo Raporo (CSV)',
    viewDetails: 'Reba Ibiri Imbere',
    markResolved: 'Kemeza ko Cyakemutse',
    markImplemented: 'Kemeza ko Cyashyizwe mu bikorwa',
    markInProgress: 'Shyira mu biri gukorwaho',
    addFollowUp: 'Kongera Ibisobanuro',
    saveNotes: 'Bika Inyandiko z\'Ubuyobozi',
    backToDashboard: 'Subira ku Munsi Mukuru',

    // Auth forms
    loginTitle: 'Injira muri Konti yawe ya QS CETU LTD',
    loginDesc: 'Koresha imeyili yawe cyangwa nimero y\'akazi (Employee ID)',
    emailOrId: 'Imeyili cyangwa Nimero y\'Akazi (e.g., QS-ENG-104)',
    password: 'Ijambobanga',
    dontHaveAccount: 'Nta konti ufite?',
    alreadyHaveAccount: 'Ufite konti usanzwe?',
    registerTitle: 'Fungura Konti Nshya y\'Umukozi',
    registerDesc: 'Uzuza imyirondoro yawe y\'akazi muri QS CETU LTD',
    fullName: 'Amazina yawe yose',
    employeeId: 'Nimero y\'akazi (Employee ID)',
    department: 'Ishami ukoreramo',
    jobTitle: 'Umwanya w\'akazi (Title)',
    phone: 'Nimero ya Terefone',
    demoAccountsTitle: 'Koresha Konti z\'Igerageza (1-Click Demo Accounts)',
    testAsAdmin: 'Injira nka: Mukamana Grace (HR & Operations Admin)',
    testAsEmployee1: 'Injira nka: Mugisha Jean Pierre (Site Engineer)',
    testAsEmployee2: 'Injira nka: Uwase Clementine (Procurement)',

    // Submission Form
    submissionFormTitle: 'Tanga Igitekerezo cyangwa Ikibazo',
    submissionFormDesc: 'Ubuyobozi bwa QS CETU LTD buzakurikiranira hafi ubu busabe.',
    submissionTypePrompt: 'Ushaka gutanga iki?',
    titlePlaceholder: 'Umutwe w\'igitekerezo cyangwa ikibazo muri make...',
    descLabel: 'Ubusobanuro burambuye',
    descPlaceholder: 'Sobanura mu buryo bwimbitse ikibazo uhuye nacyo cyangwa igitekerezo wifuza ko cyashyirwa mu bikorwa...',
    categoryLabel: 'Icyiciro cy\'ingenzi',
    urgencyLabel: 'Urwego rw\'ubwihutirwe',
    anonymousToggle: 'Gutanga mu ibanga (Anonymous submission)',
    anonymousDesc: 'Amazina yawe ntabwo azagaragarira abandi cyangwa ubuyobozi niba uhisemo kubigira ibanga.',
    submissionSuccess: 'Igitekerezo/ikibazo cyakiriwe neza! Nimero yacyo ni:',

    // Detail View
    ticketDetails: 'Amakuru arambuye ku cyatanzwe',
    ticketNumber: 'Nimero y\'ikibazo/igitekerezo',
    submittedBy: 'Cyatanzwe na',
    anonymousAuthor: 'Umukozi (Mu Ibanga)',
    submittedOn: 'Ku itariki ya',
    assignedToLabel: 'Ishami rikurikirana',
    officialResponse: 'Igisubizo cy\'Ubuyobozi bwa QS CETU LTD',
    noResponsesYet: 'Nta gisubizo kiratangwa n\'ubuyobozi. Biri mu murongo wo gusuzumwa.',
    timeline: 'Uruhererekane rw\'Ibisobanuro n\'Ibisubizo',
    addResponsePrompt: 'Tanga igisubizo cyangwa kongera ibisobanuro',
    internalNotesTitle: 'Inyandiko z\'Ibiro by\'Ubuyobozi (Internal Admin Notes)',
    internalNotesDesc: 'Izi nyandiko zirebwa n\'ubuyobozi gusa, umukozi ntabwo azibona.',
    internalNotesPlaceholder: 'Andika inyandiko z\'ibiro ku buryo iki kibazo kiri gukemurwa...',

    // Stats
    totalSubmissions: 'Igiteranyo cyose',
    pendingCount: 'Bitegereje gusubizwa',
    inProgressCount: 'Biri gukorwaho',
    resolvedCount: 'Byasubijwe / Byakemutse',
    implementedCount: 'Ibitekerezo byemejwe',
    responseRate: 'Ijanisha ry\'ibyasubijwe',

    // Empty states
    noSubmissionsFound: 'Nta bibazo cyangwa ibitekerezo bibonetse.',
    noSubmissionsDesc: 'Kanda kuri buto yo hejuru kugira ngo utange igitekerezo cyawe cya mbere cyangwa ubaze ikibazo.',
    giveFirstSubmission: 'Tanga igitekerezo cya mbere',

    // Guidelines
    guidelinesTitle: 'Amabwiriza agenga itangwa ry\'ibitekerezo n\'ibibazo muri QS CETU LTD',
    guidelinesP1: 'Ubuyobozi bwa QS CETU LTD bwashyizeho uru rubuga mu rwego rwo koroshya itumanaho no guteza imbere imibereho n\'umutekano w\'abakozi.',
    guidelinesPoint1: 'Ubwihutirwe: Ibibazo byose birebana n\'umutekano ku kazi (Safety) bisubizwa mu masaha atarenze 24.',
    guidelinesPoint2: 'Ibanga rikomeye: Buri mukozi afite uburenganzira bwo gutanga igitekerezo cyangwa ikibazo mu ibanga (Anonymous).',
    guidelinesPoint3: 'Ubwubatsi n\'Ubufatanye: Ibitekerezo byose byubaka bishyirwa imbere kandi bigahabwa agaciro mu nama z\'ubuyobozi.',
  },
  en: {
    // Brand & General
    companyName: 'QS CETU LTD',
    portalSubtitle: 'Staff & Management Portal',
    systemTagline: 'Submit ideas, report issues, and receive prompt management responses',
    home: 'Dashboard',
    submissions: 'Submissions',
    newSubmission: 'New Suggestion / Issue',
    adminPanel: 'Admin Desk',
    guidelines: 'Workplace Policy',
    staffDirectory: 'Staff Directory',
    logout: 'Sign Out',
    login: 'Sign In',
    register: 'Create Account',
    switchRole: 'Quick Demo Switch',
    
    // Roles
    roleEmployee: 'Staff Employee',
    roleAdmin: 'Management Admin',

    // Submission Types
    allTypes: 'All Types',
    suggestion: 'Suggestion / Idea',
    suggestions: 'Suggestions',
    issue: 'Issue / Concern',
    issues: 'Issues',

    // Statuses
    allStatuses: 'All Statuses',
    pending: 'Pending Review',
    in_progress: 'In Progress',
    resolved: 'Answered / Resolved',
    implemented: 'Implemented / Approved',

    // Urgencies
    normal: 'Normal Priority',
    high: 'High Priority',
    urgent: 'Critical / Urgent',

    // Categories
    safety: 'Health & Safety (HSE)',
    operations: 'Operations & Production',
    equipment: 'Tools & Heavy Machinery',
    welfare: 'Staff Welfare & Payroll',
    management: 'Management & Communication',
    other: 'General & Others',

    // Actions
    searchPlaceholder: 'Search issues or suggestions by keyword, title, employee...',
    submit: 'Submit Now',
    cancel: 'Cancel',
    reply: 'Respond',
    sendReply: 'Send Response',
    filterBy: 'Filter',
    exportReport: 'Export Data (CSV)',
    viewDetails: 'View Ticket Thread',
    markResolved: 'Mark as Resolved',
    markImplemented: 'Mark as Implemented',
    markInProgress: 'Move to In Progress',
    addFollowUp: 'Add Follow-up Message',
    saveNotes: 'Save Admin Notes',
    backToDashboard: 'Back to Overview',

    // Auth forms
    loginTitle: 'Sign in to QS CETU LTD Portal',
    loginDesc: 'Use your registered corporate email or Employee ID',
    emailOrId: 'Email or Employee ID (e.g., QS-ENG-104)',
    password: 'Password',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    registerTitle: 'Create Staff Account',
    registerDesc: 'Register your employment details with QS CETU LTD',
    fullName: 'Full Name',
    employeeId: 'Employee ID (e.g., QS-ENG-105)',
    department: 'Department',
    jobTitle: 'Job Title / Role',
    phone: 'Phone Number',
    demoAccountsTitle: '1-Click Instant Demo Login',
    testAsAdmin: 'Login as: Mukamana Grace (HR & Operations Admin)',
    testAsEmployee1: 'Login as: Mugisha Jean Pierre (Site Engineer)',
    testAsEmployee2: 'Login as: Uwase Clementine (Procurement)',

    // Submission Form
    submissionFormTitle: 'Submit a Suggestion or Raise an Issue',
    submissionFormDesc: 'QS CETU LTD executive management will review and take prompt action.',
    submissionTypePrompt: 'What would you like to submit?',
    titlePlaceholder: 'Brief summary of the idea or issue...',
    descLabel: 'Detailed Explanation',
    descPlaceholder: 'Provide clear context, locations (site), and what action or improvement you propose...',
    categoryLabel: 'Primary Department / Category',
    urgencyLabel: 'Urgency Level',
    anonymousToggle: 'Submit Anonymously',
    anonymousDesc: 'Your name and employee identity will be kept completely private.',
    submissionSuccess: 'Successfully submitted! Your ticket tracking number is:',

    // Detail View
    ticketDetails: 'Ticket Details & Resolution',
    ticketNumber: 'Ticket Reference',
    submittedBy: 'Submitted By',
    anonymousAuthor: 'Staff Member (Anonymous)',
    submittedOn: 'Date Submitted',
    assignedToLabel: 'Assigned Department',
    officialResponse: 'Official Management Response',
    noResponsesYet: 'No official response recorded yet. Ticket is currently under management review.',
    timeline: 'Resolution Timeline & Correspondence',
    addResponsePrompt: 'Write official response or follow-up note',
    internalNotesTitle: 'Internal Admin Confidential Notes',
    internalNotesDesc: 'These notes are visible solely to QS CETU LTD management administrators.',
    internalNotesPlaceholder: 'Internal management triage notes and investigation updates...',

    // Stats
    totalSubmissions: 'Total Submissions',
    pendingCount: 'Pending Response',
    inProgressCount: 'In Progress',
    resolvedCount: 'Resolved & Answered',
    implementedCount: 'Ideas Implemented',
    responseRate: 'Resolution Rate',

    // Empty states
    noSubmissionsFound: 'No issues or suggestions match your filter.',
    noSubmissionsDesc: 'Click the button below to submit a new proposal or report a workplace concern.',
    giveFirstSubmission: 'Create First Submission',

    // Guidelines
    guidelinesTitle: 'QS CETU LTD Staff Voice & Grievance Guidelines',
    guidelinesP1: 'QS CETU LTD is committed to transparency, occupational safety, and employee-driven innovation.',
    guidelinesPoint1: 'Safety First: All occupational health and site safety concerns are investigated within 24 hours.',
    guidelinesPoint2: 'Whistleblower Protection: Anonymous reports are fully protected and treated with strict confidentiality.',
    guidelinesPoint3: 'Constructive Dialogue: Concrete proposals that improve operational efficiency are rewarded.',
  }
};

export const getTranslation = (lang: Language) => translations[lang];
