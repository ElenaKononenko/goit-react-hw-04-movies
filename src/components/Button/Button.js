import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';
const Button = ({ onClick }) => {
  return (
    <button className={s.btn} type="button" onClick={() => onClick()}>
      Load more
    </button>
  );
};
export default Button;
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
