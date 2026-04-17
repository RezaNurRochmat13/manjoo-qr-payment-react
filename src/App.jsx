import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });
      setToken(response.data.token); // assuming token in response.data.token
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
    setLoading(false);
  };

  const handleGetTransactions = async () => {
    if (!token) {
      setError('Please login first');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:8080/api/transactions/qr/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Signature': '0oCq59Gzzj8pSY6Ss/bwhCvB9ps3cthddBzA2no6HWs=',
        },
      });
      setTransactions(response.data.data);
    } catch (err) {
      setError('Failed to fetch transactions: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Merchant Status Tracker</h1>
      {!token ? (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      ) : (
        <div>
          <h2>Query Transactions</h2>
          <button onClick={handleGetTransactions} disabled={loading}>
            {loading ? 'Fetching...' : 'Get Transactions'}
          </button>
          <button onClick={() => setToken('')}>Logout</button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Transactions</h2>
        {transactions.length > 0 ? (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            border: '1px solid #ddd'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>ID</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Merchant ID</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Amount</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Transaction Date</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{tx.id || tx.trx_id || '-'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{tx.merchantId || '-'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{tx.amount || tx.amount || '-'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{tx.status || '-'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{tx.transactionDate || tx.created_at || '-'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px' }}>{tx.paidDate || tx.paid_at || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found. Click "Get Transactions" to load data.</p>
        )}
      </div>
    </div>
  );
}

export default App;
