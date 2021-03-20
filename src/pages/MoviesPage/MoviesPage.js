import React, { Component } from 'react';

import Button from '../../components/Button';
import MovieList from '../../components/MovieList';
import api from '../../services/movieApi';

class MoviesPage extends Component {
  state = {
    movies: [],
    query: '',
    page: 1,
    total: null,
    error: '',
    isLoadedState: false,
  };
  componentDidMount() {
    const storedState = localStorage.getItem('storedState');
    localStorage.removeItem('storedState');
    if (storedState) {
      console.log(JSON.parse(storedState));
      let loadedState = JSON.parse(storedState);
      loadedState.isLoadedState = true;
      this.setState({ ...loadedState });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoadedState) {
      this.setState({ isLoadedState: false });
    } else {
      if (this.state.query !== prevState.query) {
        this.fetchMovie();
      }
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  saveState = () => {
    localStorage.setItem('storedState', JSON.stringify(this.state));
  };

  fetchMovie = () => {
    const { query, page } = this.state;
    api
      .fetchSearch(query, page)
      .then(res => {
        if (res.results.length === 0) {
          this.setState({ movies: [] });
        } else {
          this.setState(prevState => ({
            movies: [...prevState.movies, ...res.results],
            total: res.total_pages,
            page: prevState.page + 1,
          }));
        }

        // console.log(res);
      })
      .catch(error => {
        this.setState({ error });
        return console.log(error);
      });
  };
  submitQuery = e => {
    e.preventDefault();
    const value = e.target.elements.query.value;
    if (value === this.state.query) {
      this.fetchMovie();
    } else {
      this.setState({ query: value, page: 1, total: null, movies: [] });
    }
  };
  // handleBtn = () => {
  //   this.setState(prevState => ({
  //     page: prevState.page + 1,
  //   }));
  //   this.fetchMovie();
  // };
  render() {
    const { movies, total, page } = this.state;
    return (
      <>
        <form onSubmit={this.submitQuery}>
          <label>
            <input type="text" name="query" />
          </label>
          <button type="submit">Search</button>
        </form>
        {movies.length > 0 ? (
          <>
            <MovieList movie={movies} onClick={this.saveState} />
            {page <= total && <Button onClick={this.fetchMovie} />}
          </>
        ) : (
          <h2>Введите запрос</h2>
        )}
      </>
    );
  }
}
export default MoviesPage;
