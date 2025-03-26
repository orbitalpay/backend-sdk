export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface CheckoutSession {
    amount: number;
    details: string;
    token: string;
    transactionId: string;
    timestamp: number;
    requesterWallet: string;
    status: string;
    type: string;
    emailLinked: boolean;
    expirationTimestamp?: number;
    txhash?: string;
    callbackUrl: string;
}