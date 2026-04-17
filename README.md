# Merchant Status Tracker Interface

A modern React application built with Vite for tracking and managing merchant transactions. This interface provides a clean, responsive UI for merchants to authenticate and retrieve their transaction history.

## ✨ Features

- 🔐 **User Authentication** - Secure login with email-based authentication
- 📊 **Transaction Dashboard** - View all transactions in a clean, organized table format
- 🔄 **Real-time Data** - Fetch transaction data from backend API with bearer token authentication
- 📱 **Responsive Design** - Mobile-friendly interface that works on all screen sizes
- ⚡ **Fast Performance** - Built with Vite for instant HMR and optimized builds

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd manjoo-qr-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5174`
   - The app will automatically reload when you make changes

### Build for Production

```bash
npm run build
```

This generates optimized production files in the `dist/` directory.

## 🔗 API Integration

### Authentication Endpoint
```
POST http://localhost:8080/api/auth/login
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "your_jwt_token_here"
}
```

### Get Transactions Endpoint
```
GET http://localhost:8080/api/transactions/qr/transactions
```
**Headers Required:**
- `Authorization: Bearer {token}` - JWT token from login
- `X-Signature: {base64_encoded_value}` - Base64 encoded request signature

**Response:**
```json
{
  "data": [
    {
      "id": "transaction_id",
      "merchant_id": "merchant_id",
      "amount": "10000",
      "status": "completed",
      "transaction_date": "2024-01-15",
      "paid_date": "2024-01-15"
    }
  ]
}
```

## 📁 Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── index.css        # Global styles
└── main.jsx         # Application entry point

public/             # Static assets
```

## 🛠️ Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **CSS3** - Styling with modern CSS features

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 🎨 UI Components

- **Login Section** - Email and password input with login button
- **Transaction Table** - Displays merchant transactions with:
  - Transaction ID
  - Merchant ID
  - Amount
  - Status
  - Transaction Date
  - Paid Date
- **Error Handling** - Clear error messages for failed operations
- **Loading States** - Visual feedback during API calls

## 🔒 Security Notes

- API tokens are stored in component state (consider using secure storage for production)
- Always use HTTPS in production environments
- Keep API endpoints and credentials secure

## 🐛 Troubleshooting

### "Failed to fetch transactions" Error
- Ensure backend API is running at `http://localhost:8080`
- Verify authentication token is valid
- Check X-Signature header format

### Port Already in Use
If port 5174 is already in use, Vite will automatically try the next available port.

## 📝 Notes

- Backend API must be running for authentication and transaction retrieval
- Default theme uses a clean white background with purple accent colors
- Table supports filtering and is fully responsive on mobile devices

## 📄 License

This project is part of the Merchant QR system.

---

For more information, please visit the backend API documentation or contact the development team.
