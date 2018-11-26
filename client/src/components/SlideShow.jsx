import React from 'react';
import PropTypes from 'prop-types';
import { selectedImage } from './SlideShow.css';

const SlideShow = (props) => {
  const { renderImage, image } = props;
  return (
    <div onClick={renderImage}>
      <img src={`${image}`} className={selectedImage} />
    </div>
  );
};

SlideShow.propTypes = {
  image: PropTypes.object.isRequired,
  renderImage: PropTypes.func.isRequired,
};

export default SlideShow;
