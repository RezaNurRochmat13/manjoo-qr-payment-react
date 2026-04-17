# Merchant Status Tracker Interface

A React application built with Vite for tracking merchant transactions.

## Features

- User authentication via backend API
- Transaction query interface with multiple filters
- Integration with backend APIs for login and transaction retrieval

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5174 in your browser.

## API Integration

- Login: POST http://localhost:8080/api/auth/login
- Get Transactions: GET http://localhost:8080/api/transactions/qr/transactions (requires Bearer token and X-Signature header)
