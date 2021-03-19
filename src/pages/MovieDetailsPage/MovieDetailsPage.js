import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import api from '../../services/movieApi';
import s from './MovieDetailsPage.module.css';
import image from '../../images/noPoster.jpg';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
class MovieDetailsPage extends Component {
  state = {
    backdrop_path: null,
    genres: [],
    id: null,
    overview: null,
    title: null,
    vote_average: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await api.fetchDetails(movieId);
    this.setState({ ...response.data });
  }

  render() {
    const { backdrop_path, genres, overview, title, vote_average } = this.state;
    const posterUrl = 'https://image.tmdb.org/t/p/w500';
    let poster = backdrop_path ? `${posterUrl}${backdrop_path}` : image;
    return (
      <>
        <div className={s.MovieDetailsPage}>
          <button className={s.btnDetails} type="button">
            Go back
          </button>
          <div className={s.wrappler}>
            <img className={s.images} src={poster} alt={title} />
            <div className={s.descr}>
              <h1>{title}</h1>
              <p>User score: {vote_average}</p>
              <h2>Overviev</h2>
              <p>{overview}</p>
              <h3>Genres</h3>
              <p>
                {genres.map(({ name }) => {
                  return `${name} `;
                })}
              </p>
            </div>
          </div>
          <div className={s.Additional}>
            <h3>Additional information</h3>
            <ul>
              <li className={s.listItem}>
                <NavLink
                  to={`${this.props.match.url}/cast`}
                  className={s.listItem}
                >
                  Cast
                </NavLink>
              </li>
              <li className={s.listItem}>
                <NavLink
                  to={`${this.props.match.url}/reviews`}
                  className={s.listItem}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Switch>
          <Route path={`${this.props.match.path}/cast`} component={Cast} />
          <Route
            path={`${this.props.match.path}/reviews`}
            component={Reviews}
          />
        </Switch>
      </>
    );
  }
}

export default MovieDetailsPage;
