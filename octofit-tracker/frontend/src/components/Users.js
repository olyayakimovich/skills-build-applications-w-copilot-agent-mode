import React, { useState, useEffect } from 'react';

const codespace_name = process.env.REACT_APP_CODESPACE_NAME || (typeof window !== 'undefined' && window.location.hostname.includes('.app.github.dev') ? window.location.hostname.split('-3000')[0] : null);
const API_BASE = codespace_name
  ? `https://${codespace_name}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
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
      <h2 className="mb-4">Users</h2>
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="mb-3">
                  <span style={{fontSize: '3rem'}}>🦸</span>
                </div>
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text text-muted">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
