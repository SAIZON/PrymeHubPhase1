import { authService } from "./auth";

const API_URL = "http://localhost:8080/api/v1/admin/banks";

export interface Bank {
    id: number;
    name: string;
    logoUrl?: string;
    active: boolean;
    baseInterestRate?: number;
    // processingFee and redirectUrl are not in backend DTO yet
}
export interface BankDto {
    name: string;
    logoUrl: string;
    active: boolean;
    baseInterestRate: number;
}

export interface CreateBankRequest {
    name: string;
    logoUrl: string;
    active: boolean;
    baseInterestRate: number;
}

const getHeaders = () => {
    const token = authService.getToken();
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const adminBankService = {
    async getAllBanks(): Promise<Bank[]> {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: getHeaders(),
        });

        if (!response.ok) throw new Error("Failed to fetch banks");
        return response.json();
    },

    async createBank(data: CreateBankRequest): Promise<Bank> {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "Failed to create bank");
        }
        return response.json();
    },
    // --- NEW: Update Bank ---
    async updateBank(id: number, data: BankDto): Promise<Bank> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to update bank");
        return response.json();
    },


    async toggleStatus(id: number): Promise<Bank> {
        const response = await fetch(`${API_URL}/${id}/toggle`, {
            method: "PATCH", // Matches backend @PatchMapping
            headers: getHeaders(),
        });
        if (!response.ok) throw new Error("Failed to toggle status");
        return response.json();
    }
};
