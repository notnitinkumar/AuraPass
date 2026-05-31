

import { Navigate } from 'react-router-dom';

function OrganizerRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (role !== 'ADMIN' && role !== 'ORGANIZER') {
    return <Navigate to='/events' replace />;
  }

  return children;
}

export default OrganizerRoute;