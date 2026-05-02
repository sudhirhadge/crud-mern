import React, { useContext } from 'react';
import AuthContext from './context/AuthContext';

function UserInfo() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (!user) {
    return <div>Please log in to view user information.</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p>Username: {user.username}</p>
      
    </div>
  );
}

export default UserInfo;
