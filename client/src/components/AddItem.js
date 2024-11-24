import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchItems } from '../features/items/itemsSlice';
import AuthContext from './context/AuthContext';

function AddItem({ currentItem, setCurrentItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setDescription(currentItem.description);
    }
  }, [currentItem]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User not logged in');
      return;
    }
    try {
      if (currentItem) {
        // Update existing item
        await axios.put(`${process.env.REACT_APP_BACKEND}/items/${currentItem._id}`, { name, description }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Item updated');
      } else {
        // Add new item
        await axios.post(`${process.env.REACT_APP_BACKEND}/items`, { name, description }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Item added');
      }
      dispatch(fetchItems());
      setCurrentItem(null); // Clear the form
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding/updating item:', error);
    }
  };

  if (!user) {
    return <div>Please log in to add items.</div>;
  }

  return (
    <form onSubmit={handleAddItem}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item Description"
      />
      <button type="submit">{currentItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}

export default AddItem;
