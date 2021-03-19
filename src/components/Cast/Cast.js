import React, { Component } from 'react';
import api from '../../services/movieApi';
import image from '../../images/noPoster.jpg';
import s from './Cast.module.css';

class Cast extends Component {
  state = {
    cast: [],
  };
  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await api.fetchCast(movieId);
    this.setState({ cast: [...response.data.cast] });
    // console.log(response.data.cast);
  }

  render() {
    const { cast } = this.state;
    const posterUrl = 'https://image.tmdb.org/t/p/original';

    return cast.length > 0 ? (
      <ul className={s.Cast}>
        {cast.map(({ name, character, profile_path, id }) => {
          let poster = profile_path ? `${posterUrl}${profile_path}` : image;
          return (
            <li key={id} className={s.item}>
              <img className={s.imageCast} src={poster} alt={name} />
              <h2>{name}</h2>
              <p>{character}</p>
            </li>
          );
        })}
      </ul>
    ) : (
      <h2>нет информации</h2>
    );
  }
}

export default Cast;
