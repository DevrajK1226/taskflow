import { useEffect, useState } from 'react';

export default function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/health`)
      .then((res) => res.json())
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>TaskFlow</h1>
      {error && <p style={{ color: 'red' }}>API error: {error}</p>}
      {health ? (
        <p>API: {health.status} | Database: {health.db}</p>
      ) : (
        !error && <p>Checking API...</p>
      )}
    </div>
  );
}