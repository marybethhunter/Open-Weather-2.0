import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getWeatherByZip, addLocationToUser } from '../api/data/weatherData';

export default function Search() {
  const [formInput, setFormInput] = useState('');
  const [weatherObject, setWeatherObject] = useState({});

  const resetForm = () => {
    setFormInput('');
  };

  const handleClick = () => {
    resetForm();
    getWeatherByZip(formInput).then((weatherObj) => {
      setWeatherObject({
        location: weatherObj.name,
        description: weatherObj.weather,
        // uid: user.uid,
      });
      addLocationToUser(weatherObject);
    });
  };

  return (
    <div>
      <div className="input-group" style={{ width: '20rem' }}>
        <span className="input-group-text border-0" id="search-addon">
          <i className="fas fa-search" />
        </span>
        <input
          type="text"
          name="zip"
          id="zip"
          className="form-control"
          placeholder="Enter zip code..."
          aria-label="search for weather by zip code"
          aria-describedby="search for weather by zip code"
          value={formInput}
          onInput={(e) => setFormInput(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          Get Weather!
        </button>
      </div>
    </div>
  );
}

Search.propTypes = {
  // user: PropTypes.shape(PropTypes.obj),
  weatherObj: PropTypes.shape({
    zip: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

// Search.defaultProps = {
//   user: null,
// };
