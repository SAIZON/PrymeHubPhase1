const API_URL = import.meta.env.VITE_API_URL + '/admin/applications';

export interface Application {
    id: number;
    user: {
        id: number;
        email: string;
        fullName?: string; // Adjust based on your User entity
    };
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
        const response = await fetch(`${API_URL}?page=${page}&size=${size}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Failed to fetch applications");
        return response.json();
    }
};