// FIX: Do not append '/public/leads' here. Just use the base API URL.
const API_URL = import.meta.env.VITE_API_URL;

export interface Lead {
    id: number;
    name: string;
    mobile: string;
    email: string;
    loanType: string;
    message: string;
    status: string;
    createdAt: string;
}

export interface CreateLeadRequest {
    name: string;
    mobile: string;
    email: string;
    loanType: string;
    message: string;
    loanAmount?: number; // Optional if you have it
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const leadService = {
    // Public: Submit a new Lead
    async submitLead(data: CreateLeadRequest): Promise<Lead> {
        // Endpoint: /api/v1/public/leads
        const response = await fetch(`${API_URL}/public/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to submit inquiry: ${errorText}`);
        }
        return response.json();
    },

    // Admin: Get all Leads
    async getLeads(page = 0, size = 20): Promise<Page<Lead>> {
        const token = localStorage.getItem("token");

        // Endpoint: /api/v1/admin/leads
        const response = await fetch(`${API_URL}/admin/leads?page=${page}&size=${size}&sort=createdAt,desc`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error("Access Denied: You do not have admin permissions.");
            }
            throw new Error("Failed to fetch leads");
        }
        return response.json();
    }
};