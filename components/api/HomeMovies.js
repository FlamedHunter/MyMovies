export async function fetchTopMovies() {
  const apiKey = 'c3e56830b46f646e155452cc49256e1c';
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}


export async function fetchLatestMovies() {
  const apiKey = 'c3e56830b46f646e155452cc49256e1c';
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}


export async function fetchPopularMovies() {
  const apiKey = 'c3e56830b46f646e155452cc49256e1c';
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

export async function fetchUpcomingMovies() {
  const apiKey = 'c3e56830b46f646e155452cc49256e1c';
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}