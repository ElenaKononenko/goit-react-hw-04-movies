import React from 'react';
import PropTypes from 'prop-types';
import MoviePreview from '../MoviePreview';
import { Link, withRouter } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movie, location, onClick }) => {
  return (
    <ul className={s.MovieList}>
      {movie.map(({ backdrop_path, id, title }) => (
        <li key={id}>
          <Link
            onClick={() => onClick()}
            to={{
              pathname: `/movies/${id}`,
              state: {
                from: location,
              },
            }}
          >
            <MoviePreview title={title} backdrop_path={backdrop_path} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default withRouter(MovieList);
MovieList.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      backdrop_path: PropTypes.string,
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
  location: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
