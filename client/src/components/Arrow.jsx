import React from 'react';
import PropTypes from 'prop-types';
import {
  left,
  right,
  leftArrow,
  rightArrow,
} from './Arrow.css';

const LeftArrow = (props) => {
  const { go, direction } = props;
  const iClass = (direction === 'left') ? left : right;
  const spanClass = (direction === 'left') ? leftArrow : rightArrow;
  return (
    <span className={spanClass} onClick={go}>
      <i className={`fas fa-angle-${direction} ${iClass}`} />
    </span>
  );
};

LeftArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default LeftArrow;
