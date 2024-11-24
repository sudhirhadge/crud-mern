import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/items/itemsSlice';
import axios from 'axios';
import AuthContext from './context/AuthContext';

function ItemList({ setCurrentItem }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const itemStatus = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);
  const { user, loading } = useContext(AuthContext);

  
  useEffect(() => {
    if (itemStatus === 'idle') {
      dispatch(fetchItems());
    }
  }, [itemStatus, dispatch]);

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (!user) {
    return <div>Please log in to view your todo list.</div>;
  }


  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}/items/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(fetchItems()); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2>Items</h2>
      {itemStatus === 'loading' && <div>Loading...</div>}
      {itemStatus === 'succeeded' && (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.name}: {item.description}
              <button onClick={() => handleDelete(item._id)}>Delete</button>
              <button onClick={() => setCurrentItem(item)}>Update</button>
            </li>
          ))}
        </ul>
      )}
      {itemStatus === 'failed' && <div>{error}</div>}
    </div>
  );
}

export default ItemList;
