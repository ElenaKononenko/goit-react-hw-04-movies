import React, { Component } from 'react';
import MovieList from '../../components/MovieList';
import Button from '../../components/Button';
import api from '../../services/movieApi';
import queryString from 'query-string';
class HomePage extends Component {
  state = {
    popularMovie: [],
    page: 1,
  };
  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    if (Number(parsed.p) > 1) {
      this.setState({ page: Number(parsed.p) });
    } else {
      this.setState({ page: 1 });
      this.fetchMovie();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (this.state.page !== prevState.page) {
      this.fetchMovie();
    }

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
        }));
        this.props.location.search = queryString.stringify({
          p: page,
        });

        this.props.history.push({
          pathname: this.props.location.pathname,
          search: this.props.location.search,
        });
      })
      .catch(error => this.state({ error }));
  };
  handleBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { popularMovie } = this.state;
    return (
      <>
        <h1>Trending today</h1>
        <MovieList movie={popularMovie} />
        <Button onClick={this.handleBtn} />
      </>
    );
  }
}
export default HomePage;
