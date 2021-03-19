import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import api from '../../services/movieApi';
import s from './MoviesPage.module.css';
import image from '../../images/noPoster.jpg';
class MoviesPage extends Component {
  state = {
    movies: [],
    query: '',
    page: 1,
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
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
        }
        console.log(res);
        this.setState(prevState => ({
          movies: [...prevState.movies, ...res.results],
          page: prevState.page + 1,
          total: res.total_pages,
        }));
      })
      .catch(error => this.state({ error }));
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

  render() {
    const posterUrl = 'https://image.tmdb.org/t/p/w500';
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
            <ul className={s.MoviePage}>
              {movies.map(({ backdrop_path, id, title }) => {
                let poster = backdrop_path
                  ? `${posterUrl}${backdrop_path}`
                  : image;
                return (
                  <li key={id}>
                    <Link to={`${this.props.match.url}/${id}`}>
                      <div className={s.MoviePage_item}>
                        <p> {title}</p>
                        <img
                          className={s.picture}
                          src={poster}
                          alt={title}
                          width="100"
                          height="auto"
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
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
