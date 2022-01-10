import React from 'react';
import PropTypes from 'prop-types';

export default function LocationCards({ location }) {
  return <>{location.location}</>;
}

LocationCards.propTypes = {
  location: PropTypes.shape(PropTypes.obj).isRequired,
};
