import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favmovies: [],
  count: 0,
};


const loadLikedMoviesFromStorage = async () => {
  try {
    const jsonMovies = await AsyncStorage.getItem('likedMovies');
    if (jsonMovies !== null) {
      const movies = JSON.parse(jsonMovies);
      return movies;
    }
  } catch (error) {
    console.log('Error loading liked movies from AsyncStorage: ', error);
  }
  return [];
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addMovie: {
      reducer: (state, action) => {
        state.favmovies.push(action.payload);
        state.count = state.count + 1;
      },
      prepare: (name, img, id) => {
        return {
          payload: {
            id: id,
            name: name,
            img: img,
          },
        };
      },
    },
    removeMovie: (state, action) => {
      state.favmovies = state.favmovies.filter(movie => movie.id !== action.payload);
      state.count = state.count - 1;
    },

    saveLikedMovies: (state) => {
      AsyncStorage.setItem('likedMovies', JSON.stringify(state.favmovies))
        .catch(error => console.log('Error saving liked movies to AsyncStorage: ', error));
    },
  },
});


export const loadLikedMovies = () => async (dispatch) => {
    const movies = await loadLikedMoviesFromStorage();
    movies.map(movie=>{
        dispatch(favouritesSlice.actions.addMovie(movie.name,movie.img,movie.id));
    })
};

export const { addMovie, removeMovie, saveLikedMovies } = favouritesSlice.actions;

export default favouritesSlice.reducer;
