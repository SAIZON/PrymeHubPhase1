// 1. FIX: Define Base URL first with fallback, then append endpoint
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
const API_URL = `${BASE_URL}/admin/applications`;

export interface Application {
    id: number;
    user: {
        id: number;
        email: string;
        fullName?: string;
    } | null;
    bankName: string;
    productName: string;
    loanType: string;
    amount: number;
    tenureMonths: number;
    status: string;
    createdAt: string;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const adminApplicationService = {
    async getAllApplications(page = 0, size = 20): Promise<Page<Application>> {
        const token = localStorage.getItem("token");

        // Added sort parameter to show newest first
        const response = await fetch(`${API_URL}?page=${page}&size=${size}&sort=createdAt,desc`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            // Read error text for better debugging
            const errorText = await response.text();
            throw new Error(`Failed to fetch applications: ${response.status} ${errorText}`);
        }
        return response.json();
    },

    async updateApplicationStatus(id: number, status: string): Promise<Application> {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${id}/status?status=${status}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Failed to update application status");
        return response.json();
    },

    // Fetch documents for a specific application
    async getApplicationDocuments(applicationId: number): Promise<any[]> {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${applicationId}/documents`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Failed to fetch documents");
        return response.json();
    },

    // Verify or Reject a document
    async verifyDocument(documentId: string, status: 'VERIFIED' | 'REJECTED', remarks?: string): Promise<void> {
        const token = localStorage.getItem("token");
        const params = new URLSearchParams({ status });
        if (remarks) params.append("remarks", remarks);

        const response = await fetch(`${API_URL}/documents/${documentId}/verify?${params.toString()}`, {
            method: 'PATCH',
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Failed to verify document");
    }
};