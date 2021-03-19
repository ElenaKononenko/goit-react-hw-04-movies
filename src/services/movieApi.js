import axios from 'axios';
axios.defaults.baseURL = `https://api.themoviedb.org/3`;
const KEY = `0cd28c5ead78fcbe7aeeb8683bb2b504`;
// const BASE_URL = ` https://api.themoviedb.org/3`;
// const trendingUrl = `/trending/movie/day?api_key=${KEY}`;
// const reviewsUrl = `/movie/${movie_id}/reviews?api_key=${KEY}`;
// const searchUrl = `/search/movie?query=${query}&page=${page}&api_key=${KEY}`;
// const details = `/movie/${movie_id}?api_key=${KEY}`;

async function fetchTrending(page) {
  const response = await axios.get(
    `/trending/movie/day?page=${page}&api_key=${KEY}`,
  );
  return response.data;
}
async function fetchSearch(query, page) {
  const response = await axios.get(
    `/search/movie?query=${query}&page=${page}&api_key=${KEY}`,
  );
  console.log(response);
  return response.data;
}

async function fetchDetails(movie_id) {
  const response = await axios.get(`/movie/${movie_id}?api_key=${KEY}`);
  console.log(response);
  return response;
}
async function fetchCast(movie_id) {
  const response = await axios.get(`/movie/${movie_id}/credits?api_key=${KEY}`);
  console.log(response);
  return response;
}
async function fetchReviews(movie_id) {
  const response = await axios.get(`/movie/${movie_id}/reviews?api_key=${KEY}`);
  console.log(response);
  return response;
}
export default {
  fetchTrending,
  fetchSearch,
  fetchDetails,
  fetchCast,
  fetchReviews,
};
