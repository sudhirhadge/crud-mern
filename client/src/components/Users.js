import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/items/userSlice';

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  return (
    <div>
      <h2>Users</h2>
      {userStatus === 'loading' && <div>Loading...</div>}
      {userStatus === 'succeeded' && (
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      )}
      {userStatus === 'failed' && <div>{error}</div>}
    </div>
  );
}

export default Users;
