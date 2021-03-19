import React, { Component } from 'react';
import MovieList from '../../components/MovieList';
import Button from '../../components/Button';
import api from '../../services/movieApi';

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
    const { popularMovie } = this.state;
    return (
      <>
        <h1>Trending today</h1>
        <MovieList movie={popularMovie} />
        <Button onClick={this.fetchMovie} />
      </>
    );
  }
}
export default HomePage;
