import api from './api';

export interface DashboardStats {
    activeApplications: number;
    unreadNotifications: number;
    totalExternalDebt: number;
}

export interface Application {
    id: string;
    loanType: string;
    amount: number;
    status: string;
    createdAt: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    read: boolean; // Changed from isRead to read to match common JSON mapping if needed, check Backend
    createdAt: string;
}

export interface ExternalLoan {
    id: string;
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