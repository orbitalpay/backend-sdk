import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "./consts";

import { CheckoutSession, ApiResponse } from "./types";

export class OrbitalPayBackendClient {
    private api: AxiosInstance;
    private privateKey: string;
    private publicKey: string;

    constructor(privateKey: string, publicKey: string) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.api = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    private convertApiCheckoutToCheckoutSession(data: any): CheckoutSession {
        return {
            amount: data.amount,
            details: data.details,
            token: data.token,
            transactionId: data.transaction_id,
            timestamp: data.timestamp,
            requesterWallet: data.requester_wallet,
            status: data.status,
            type: data.type,
            emailLinked: data.email_linked,
            expirationTimestamp: data.expiration_timestamp,
            txhash: data.txhash,
            callbackUrl: data.callback_url,
        };
    }

    async fetchCheckoutSession(transactionId: string): Promise<ApiResponse<CheckoutSession>> {
        try {
            const response = await this.api.post("/merchants/fetch-checkout", {
                transaction_id: transactionId,
            }, {
                headers: {
                    "x-api-key": this.publicKey,
                }
            });
            const data = response.data;

            if (!data.success) {
                return {
                    success: false,
                    error: data.error,
                }
            }

            return {
                success: true,
                data: this.convertApiCheckoutToCheckoutSession(data),
            };            
        } catch (error: any) {
            console.error("API error:", error, typeof error);
            throw new Error("Failed to create checkout session");
        }
    }

    async fetchHistoricalCheckoutSessions(): Promise<ApiResponse<CheckoutSession[]>> {
        try {
            const response = await this.api.get("/merchants/fetch-checkouts", {
                headers: {
                    "x-api-key": this.privateKey,
                }
            });
            const data = response.data;
            console.log(data);

            if (!data.success) {
                return {
                    success: false,
                    error: data.error,
                }
            }

            return {
                success: true,
                data: data.checkouts.map((checkout: any) => this.convertApiCheckoutToCheckoutSession(checkout)),
            };            
        } catch (error) {
            console.error("API error:", error);
            throw new Error("Failed to fetch historical checkout sessions");
        }
    }

    async createCheckoutSession(amount: number, details: string): Promise<ApiResponse<CheckoutSession>> {
        try {
            const response = await this.api.post("/merchants/create-checkout", {
                amount: Math.round(amount * 1e6),
                details,
                token: "USDC",
            }, {
                headers: {
                    "x-api-key": this.privateKey,
                }
            });
            const data = response.data;

            if (!data.success) {
                return {
                    success: false,
                    error: data.error,
                }
            }

            return {
                success: true,
                data: this.convertApiCheckoutToCheckoutSession(data),
            };            
        } catch (error) {
            console.error("API error:", error);
            throw new Error("Failed to create checkout session");
        }
    }
}
