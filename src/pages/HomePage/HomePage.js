import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import api from '../../services/movieApi';
import image from '../../images/noPoster.jpg';
import s from './HomePage.module.css';

class HomePage extends Component {
  state = {
    popularMovie: [],
    page: 1,
  };
  componentDidMount() {
    this.setState({ page: 1 });
    this.fetchMovie();
  }
  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (page > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchMovie = () => {
    const { page } = this.state;
    api
      .fetchTrending(page)
      .then(res => {
        if (res.results.length === 0) {
          this.setState({ popularMovie: [] });
        }

        this.setState(prevState => ({
          popularMovie: [...prevState.popularMovie, ...res.results],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.state({ error }));
  };
  render() {
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const { popularMovie } = this.state;
    return (
      <>
        <h1>Trending today</h1>
        <ul className={s.HomePage}>
          {popularMovie.map(({ backdrop_path, id, title }) => {
            let poster = backdrop_path ? `${posterUrl}${backdrop_path}` : image;
            return (
              <li key={id}>
                <Link to={`/movies/${id}`}>
                  <div className={s.HomePage_item}>
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
        <Button onClick={this.fetchMovie} />
      </>
    );
  }
}
export default HomePage;
