# Orbital Pay

A fast, open and decentralized way of receiving payments. This is the backend SDK for integrating Orbital Pay into your application. Learn more about Orbital Pay [here](https://orbitalpay.xyz).

## Installation

```bash
npm install @orbitalpay/backend
```

## Warning
This SDK uses your merchant private key. Do NOT use this SDK in your frontend application, it should only be used server-side. Use the @orbitalpay/frontend SDK should be used in your frontend application instead.

## Usage

```typescript
const client = new OrbitalPayBackendClient(process.env.privateKey!, process.env.publicKey!);

const amount = 3.14;
const description = "Trying out the Backend SDK";

// Create a new checkout session
const checkout = await client.createCheckoutSession(amount, description);

// Query the checkout session to see the state, transaction hash (if paid) and other details
const checkoutSession = await client.fetchCheckoutSession(response.data?.transactionId);

// Fetch all historical checkout sessions created by your merchant
const historicalCheckouts = await client.fetchHistoricalCheckoutSessions();
```

The `fetchHistoricalCheckoutSessions` is paginated.

```typescript
// Number of items to fetch, defaults to 10
const count = 20;
// Timestamp of the last item fetched in the previous call, default: undefined
const last_timestamp = 1690000000;
// Order of the items, default: "ASCENDING", can be "ASCENDING" or "DESCENDING"
const order = "ASCENDING";

// Any parameter can be omitted
const historicalCheckouts = await client.fetchHistoricalCheckoutSessions({
  count,
  last_timestamp,
  order,
});
```
