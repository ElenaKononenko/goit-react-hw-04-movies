import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
const Navigation = () => {
  return (
    <div className={s.Navigation}>
      <ul className={s.list}>
        <li>
          <NavLink
            exact
            to="/"
            className={s.listItem}
            activeClassName={s.activeLink}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/movies"
            className={s.listItem}
            activeClassName={s.activeLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
