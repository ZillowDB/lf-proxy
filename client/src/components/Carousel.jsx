import React from 'react';
import PropTypes from 'prop-types';
import {
  carouselContainer,
  firstImageContainer,
  imageContainer,
} from './Carousel.css';

const Carousel = (props) => {
  const { images, renderImage } = props;
  const otherImages = images.slice(1);
  let imageCount = 0;
  return (
    <div className={carouselContainer}>
      {images.length === 0 ? ''
        : (
          <img
            src={`${images[0].imageUrl}`}
            className={firstImageContainer}
            id={imageCount}
            alt={'Home 0'}
            onClick={renderImage}
          />
        )
      }
      {otherImages.map((image, index) => (
        <img
          key={index}
          src={`${image.imageUrl}`}
          className={imageContainer}
          id={imageCount += 1}
          alt={`Home ${index}`}
          onClick={renderImage}
        />
      )
      )}
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  renderImage: PropTypes.func.isRequired,
};

export default Carousel;
