import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from '../components/favourites/favouritesSlice'
import screenReducer from '../components/navbar/screenSlice'
import typeReducer from '../components/home/typeSlice'
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    screen: screenReducer,
    type: typeReducer,
  },
  middleware: [thunk],
});

export default store;
