import React, { useState, useEffect } from 'react';

const codespace_name = process.env.REACT_APP_CODESPACE_NAME || (typeof window !== 'undefined' && window.location.hostname.includes('.app.github.dev') ? window.location.hostname.split('-3000')[0] : null);
const API_BASE = codespace_name
  ? `https://${codespace_name}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        setWorkouts(data);
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
      <h2 className="mb-4">Workouts</h2>
      <div className="row">
        {workouts.map(workout => (
          <div key={workout.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">💪 {workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    <strong>Duration:</strong> {workout.duration} minutes
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
