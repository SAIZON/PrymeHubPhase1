import api from './api';

export interface PublicLoanProduct {
    id: number;
    bankName: string;
    bankLogoUrl: string;
    loanType: string;
    interestRate: string;
    processingFee: string;
    maxLoanAmount: string;
    tenure: string;
    features: string[];
}

export const getAllPublicLoans = async () => {
    // Uses the public endpoint we just created
    return await api.get<PublicLoanProduct[]>('/public/loans');
};