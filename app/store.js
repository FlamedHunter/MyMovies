import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from '../components/favourites/favouritesSlice'
import screenReducer from '../components/navbar/screenSlice'
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    screen: screenReducer
  },
  middleware: [thunk],
});

export default store;
