const API_URL = import.meta.env.VITE_API_URL + '/public/leads';

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
        const response = await fetch(`${API_URL}/public/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to submit inquiry");
        return response.json();
    },

    // Admin: Get all Leads
    async getLeads(page = 0, size = 20): Promise<Page<Lead>> {
        // Note: Ensure your Auth token is included if this is an admin route
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/admin/leads?page=${page}&size=${size}&sort=createdAt,desc`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Failed to fetch leads");
        return response.json();
    }
};