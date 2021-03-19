import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import api from '../../services/movieApi';
import routes from '../../routes';
import MovieDetailsCard from '../../components/MovieDetailsCard';
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
  handleButton = () => {
    const { location, history } = this.props;
    history.push(location?.state?.from || routes.home);
  };
  render() {
    const { backdrop_path, genres, overview, title, vote_average } = this.state;
    return (
      <>
        <MovieDetailsCard
          title={title}
          overview={overview}
          vote_average={vote_average}
          genres={genres}
          backdrop_path={backdrop_path}
          onClick={this.handleButton}
        />
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
