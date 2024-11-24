import { configureStore } from '@reduxjs/toolkit';
// import itemsReducer from './features/items/itemsSlice';
import itemsReducer from "./features/items/itemsSlice"
import usersReducer from "./features/items/userSlice"


export const store = configureStore({
  reducer: {
    items: itemsReducer,
    users: usersReducer,
  },
});
