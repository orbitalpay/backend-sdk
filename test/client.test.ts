import { OrbitalPayBackendClient } from "../src/client";

describe("OrbitalPayBackendClient", () => {
  it("should initialize correctly", () => {
    const client = new OrbitalPayBackendClient(process.env.privateKey!, process.env.publicKey!);
    expect(client).toBeInstanceOf(OrbitalPayBackendClient);
  });

    it("should fetch checkout session", async () => {
        const client = new OrbitalPayBackendClient(process.env.privateKey!, process.env.publicKey!);
        const response = await client.fetchCheckoutSession("mrc_2025-03-26_13:14:18_28fd605c3ab7424e94c4af8d989bf9ad");
        console.log(response);
        response.data?.transactionId
        expect(response).toBeTruthy();
    });
    
    it("should fetch historic checkout sessions", async () => {
        const client = new OrbitalPayBackendClient(process.env.privateKey!, process.env.publicKey!);
        const response = await client.fetchHistoricalCheckoutSessions();
        console.log(response);
        expect(response).toBeTruthy();
    });

    it("should fetch historic checkout sessions", async () => {
        const client = new OrbitalPayBackendClient(process.env.privateKey!, process.env.publicKey!);
        const response = await client.createCheckoutSession(0.15, "Trying out the sdk");
        console.log(response);
        expect(response).toBeTruthy();
    });
});
