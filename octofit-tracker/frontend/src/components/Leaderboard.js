import React, { useState, useEffect } from 'react';

const codespace_name = process.env.REACT_APP_CODESPACE_NAME || (typeof window !== 'undefined' && window.location.hostname.includes('.app.github.dev') ? window.location.hostname.split('-3000')[0] : null);
const API_BASE = codespace_name
  ? `https://${codespace_name}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => b.points - a.points);
        setEntries(sorted);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">Leaderboard</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id}>
              <td>
                {index === 0 && <span>🥇 </span>}
                {index === 1 && <span>🥈 </span>}
                {index === 2 && <span>🥉 </span>}
                {index + 1}
              </td>
              <td>{entry.user?.username || 'Unknown'}</td>
              <td><span className="badge bg-success">{entry.points}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
