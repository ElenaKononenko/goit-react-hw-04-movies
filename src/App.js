import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Navigation from './components/Navigation';
import './index.css';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
class App extends Component {
  state = {};

  render() {
    return (
      <>
        <Navigation />

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route path="/movies" exact component={MoviesPage} />
          {/* <Route component={HomePage} /> */}
        </Switch>
      </>
    );
  }
}

export default App;
