import React, { useState, useEffect } from 'react';

const codespace_name = process.env.REACT_APP_CODESPACE_NAME || (typeof window !== 'undefined' && window.location.hostname.includes('.app.github.dev') ? window.location.hostname.split('-3000')[0] : null);
const API_BASE = codespace_name
  ? `https://${codespace_name}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        setActivities(data);
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
      <h2 className="mb-4">Activities</h2>
      <div className="row">
        {activities.map(activity => (
          <div key={activity.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{activity.name}</h5>
                <p className="card-text">{activity.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    <strong>Schedule:</strong> {activity.schedule}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    <strong>Max Attendance:</strong> {activity.max_attendance}
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

export default Activities;
