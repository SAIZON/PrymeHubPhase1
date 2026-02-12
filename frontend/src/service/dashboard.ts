import api from './api';

// --- INTERFACES ---

export interface DashboardStats {
    activeApplications: number;
    unreadNotifications: number;
    totalExternalDebt: number;
}

export interface Application {
    id: number;
    loanType: string;
    bankName?: string; // Added
    amount: number;
    status: string;
    createdAt: string;
}

export interface ApplicationRequest {
    loanType: string;
    amount: number;
    tenureMonths: number;
    productId?: number;
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    type: string;
    read: boolean;
    createdAt: string;
}

export interface ExternalLoan {
    id: number;
    bankName: string;
    loanType: string;
    outstandingAmount: number;
    emiAmount: number;
}

export interface LoanDocument {
    id: string;
    name: string;
    category: string;
    status: string;
    uploadedAt: string;
}

// --- API FUNCTIONS ---

export const getDashboardStats = async () => {
    return await api.get<DashboardStats>('/dashboard/stats');
};

export const getRecentApplications = async () => {
    return await api.get<Application[]>('/dashboard/applications');
};

export const getNotifications = async () => {
    return await api.get<Notification[]>('/dashboard/notifications');
};

export const getExternalLoans = async () => {
    return await api.get<ExternalLoan[]>('/dashboard/external-loans');
};

export const getDocuments = async () => {
    return await api.get<LoanDocument[]>('/dashboard/documents');
};

// FIX: Exported function for submitting application
export const submitApplication = async (data: ApplicationRequest) => {
    return await api.post('/dashboard/apply', data);
};