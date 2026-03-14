import React, { useState, useEffect } from 'react';

const codespace_name = process.env.REACT_APP_CODESPACE_NAME || (typeof window !== 'undefined' && window.location.hostname.includes('.app.github.dev') ? window.location.hostname.split('-3000')[0] : null);
const API_BASE = codespace_name
  ? `https://${codespace_name}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        setTeams(data);
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
      <h2 className="mb-4">Teams</h2>
      <div className="row">
        {teams.map(team => (
          <div key={team.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{team.name}</h5>
              </div>
              <div className="card-body">
                <h6>Members:</h6>
                <ul className="list-group list-group-flush">
                  {team.members && team.members.map((member, idx) => (
                    <li key={idx} className="list-group-item">
                      {member.username || member}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
