import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Submission, SubmissionStatus, Language, ResponseMessage } from '../types';
import { INITIAL_USERS, INITIAL_SUBMISSIONS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  submissions: Submission[];
  language: Language;
  setLanguage: (lang: Language) => void;
  login: (emailOrId: string) => boolean;
  register: (data: {
    name: string;
    employeeId: string;
    email: string;
    phone: string;
    department: string;
    title: string;
    role?: 'employee' | 'admin';
  }) => User;
  logout: () => void;
  switchUser: (userId: string) => void;
  createSubmission: (data: {
    type: 'suggestion' | 'issue';
    title: string;
    description: string;
    category: Submission['category'];
    urgency: Submission['urgency'];
    isAnonymous: boolean;
  }) => Submission;
  addResponse: (
    submissionId: string,
    message: string,
    newStatus?: SubmissionStatus,
    isOfficialResolution?: boolean
  ) => void;
  updateStatus: (submissionId: string, status: SubmissionStatus) => void;
  updateInternalNotes: (submissionId: string, notes: string) => void;
  deleteSubmission: (submissionId: string) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  USERS: 'qs_cetu_users_v1',
  SUBMISSIONS: 'qs_cetu_submissions_v1',
  CURRENT_USER_ID: 'qs_cetu_current_user_id_v1',
  LANG: 'qs_cetu_lang_v1',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved === 'en' || saved === 'rw') ? saved : 'rw';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  // 2. Users state
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_USERS;
  });

  // 3. Current User state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      if (savedId) {
        const found = INITIAL_USERS.find(u => u.id === savedId);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    // By default, user is NOT logged in until they enter credentials or choose an account
    return null;
  });

  // 4. Submissions state
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SUBMISSIONS;
  });

  // Sync users to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  // Sync submissions to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  // Sync current user ID
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUser.id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUser]);

  const login = (emailOrId: string): boolean => {
    const cleanQuery = emailOrId.trim().toLowerCase();
    const matched = users.find(
      u => u.email.toLowerCase() === cleanQuery || u.employeeId.toLowerCase() === cleanQuery
    );
    if (matched) {
      setCurrentUser(matched);
      return true;
    }
    return false;
  };

  const register = (data: {
    name: string;
    employeeId: string;
    email: string;
    phone: string;
    department: string;
    title: string;
    role?: 'employee' | 'admin';
  }): User => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      employeeId: data.employeeId.trim().toUpperCase(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      department: data.department.trim(),
      title: data.title.trim() || 'Staff Member',
      role: data.role || 'employee',
      createdAt: new Date().toISOString(),
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
    }
  };

  const createSubmission = (data: {
    type: 'suggestion' | 'issue';
    title: string;
    description: string;
    category: Submission['category'];
    urgency: Submission['urgency'];
    isAnonymous: boolean;
  }): Submission => {
    if (!currentUser) {
      throw new Error('Must be logged in to submit');
    }

    const currentYear = new Date().getFullYear();
    const nextSeq = submissions.length + 1;
    const ticketNumber = `QS-TKT-${currentYear}-${String(nextSeq).padStart(3, '0')}`;

    const newSub: Submission = {
      id: `sub_${Date.now()}`,
      ticketNumber,
      type: data.type,
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category,
      urgency: data.urgency,
      isAnonymous: data.isAnonymous,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        employeeId: currentUser.employeeId,
        department: currentUser.department,
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
      assignedTo: `${data.category.toUpperCase()} Department`,
    };

    setSubmissions(prev => [newSub, ...prev]);
    return newSub;
  };

  const addResponse = (
    submissionId: string,
    message: string,
    newStatus?: SubmissionStatus,
    isOfficialResolution?: boolean
  ) => {
    // Only administrators/leaders are permitted to answer issues & suggestions
    if (!currentUser || currentUser.role !== 'admin') return;

    const responseItem: ResponseMessage = {
      id: `resp_${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorTitle: currentUser.title,
      message: message.trim(),
      createdAt: new Date().toISOString(),
      isOfficialResolution: Boolean(isOfficialResolution),
    };

    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.id !== submissionId) return sub;

        const updatedResponses = [...sub.responses, responseItem];
        let nextStatus = sub.status;

        if (newStatus) {
          nextStatus = newStatus;
        } else if (currentUser.role === 'admin' && sub.status === 'pending') {
          nextStatus = 'in_progress';
        }

        return {
          ...sub,
          responses: updatedResponses,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const updateStatus = (submissionId: string, status: SubmissionStatus) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === submissionId
          ? { ...sub, status, updatedAt: new Date().toISOString() }
          : sub
      )
    );
  };

  const updateInternalNotes = (submissionId: string, notes: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === submissionId
          ? { ...sub, internalNotes: notes, updatedAt: new Date().toISOString() }
          : sub
      )
    );
  };

  const deleteSubmission = (submissionId: string) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
  };

  const resetToDefaults = () => {
    setUsers(INITIAL_USERS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        submissions,
        language,
        setLanguage,
        login,
        register,
        logout,
        switchUser,
        createSubmission,
        addResponse,
        updateStatus,
        updateInternalNotes,
        deleteSubmission,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
