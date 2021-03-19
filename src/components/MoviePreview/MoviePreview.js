import React from 'react';
import PropTypes from 'prop-types';
import image from '../../images/noPoster.jpg';
import s from './MoviePreview.module.css';

const MoviePreview = ({ backdrop_path, title }) => {
  const posterUrl = 'https://image.tmdb.org/t/p/original';
  let poster = backdrop_path ? `${posterUrl}${backdrop_path}` : image;
  return (
    <div className={s.MoviePreview_item}>
      <div className={s.tumb}>
        <img
          className={s.picture}
          src={poster}
          alt={title}
          width="100"
          height="auto"
        />
      </div>
      <h2> {title}</h2>
    </div>
  );
};
export default MoviePreview;
MoviePreview.defaultProps = {
  title: 'Нет информации',
  backdrop_path: image,
};
MoviePreview.propTypes = {
  backdrop_path: PropTypes.string,
  title: PropTypes.string,
};
