import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router';
import Navigation from './components/Navigation';
import './index.css';
// import HomePage from './pages/HomePage';
// import MoviesPage from './pages/MoviesPage';
// import MovieDetailsPage from './pages/MovieDetailsPage';
import routes from './routes';
class App extends Component {
  state = {};

  render() {
    const HomePage = lazy(() =>
      import('./pages/HomePage' /* webpackChunkName:'HomePage'*/),
    );
    const MovieDetailsPage = lazy(() =>
      import(
        './pages/MovieDetailsPage' /* webpackChunkName:'MovieDetailsPage'*/
      ),
    );
    const MoviesPage = lazy(() =>
      import('./pages/MoviesPage' /* webpackChunkName:'MoviesPage'*/),
    );
    return (
      <>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={routes.home} exact component={HomePage} />
            <Route path={routes.moviesDetails} component={MovieDetailsPage} />
            <Route path={routes.movies} exact component={MoviesPage} />
            <Route component={HomePage} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App;
