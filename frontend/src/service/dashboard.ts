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
    id: string;
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

export interface ApplicationDetails extends Application {
    productName: string;
    tenureMonths: number;
    // Add other fields you might want to show like rejectionReason, etc.
}

export interface LoanDocument {
    id: string;
    fileName: string;
    category: string; // Maps to DocumentType enum
    status: string;   // PENDING, VERIFIED, REJECTED
    adminRemarks?: string;
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

export const getApplicationDetails = async (id: number) => {
    return await api.get<ApplicationDetails>(`/dashboard/application/${id}`);
};

export const markNotificationAsRead = async (id: string) => {
    // Note: Calling the new controller at /api/v1/notifications
    return await api.patch<Notification>(`/notifications/${id}/read`);
};

export const uploadDocument = async (file: File, applicationId: number, type: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("applicationId", applicationId.toString());
    formData.append("type", type);

    // Use the api instance so the token is automatically attached
    return await api.post('/documents/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // Required for file uploads
        }
    });
};