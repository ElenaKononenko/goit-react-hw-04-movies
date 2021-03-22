import React, { Component } from 'react';

import Button from '../../components/Button';
import MovieList from '../../components/MovieList';
import api from '../../services/movieApi';
import queryString from 'query-string';

class MoviesPage extends Component {
  state = {
    movies: [],
    query: '',
    page: 1,
    total: null,
    error: '',
  };
  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    if (parsed.q) {
      this.setState({ page: Number(parsed.p), query: parsed.q });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.fetchMovie();
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

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
          }));

          this.props.location.search = queryString.stringify({
            q: query,
            p: page,
          });

          this.props.history.push({
            pathname: this.props.location.pathname,
            search: this.props.location.search,
          });
        }
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
  handleBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
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
            <MovieList movie={movies} />
            {page <= total && <Button onClick={this.handleBtn} />}
          </>
        ) : (
          <h2>Введите запрос</h2>
        )}
      </>
    );
  }
}
export default MoviesPage;
