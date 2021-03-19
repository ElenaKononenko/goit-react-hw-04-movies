import React, { Component } from 'react';
import api from '../../services/movieApi';
import s from './Reviews.module.css';

class Reviews extends Component {
  state = {
    reviews: [],
  };
  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await api.fetchReviews(movieId);
    this.setState({ reviews: response.data.results });
    // console.log(response.data.results);
  }

  render() {
    const { reviews } = this.state;

    return reviews.length > 0 ? (
      <ul className={s.reviews}>
        {reviews.map(({ author, content, id }) => {
          return (
            <li key={id} className={s.item}>
              <h2>{author}</h2>
              <p>{content}</p>
            </li>
          );
        })}
      </ul>
    ) : (
      <h2>нет информации</h2>
    );
  }
}
export default Reviews;
