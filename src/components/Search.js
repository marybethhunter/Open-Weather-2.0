import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addLocationToUser, getWeatherByZip } from '../api/data/weatherData';

const initialState = {
  zip: '',
};

export default function Search({ user }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormInput({ ...initialState });
  };

  const handleClick = () => {
    resetForm();
    getWeatherByZip(formInput).then(() => {
      addLocationToUser({ ...formInput, uid: user.uid });
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
          name="weather"
          className="form-control"
          placeholder="Enter zip code..."
          aria-label="search for weather"
          aria-describedby="search for weather"
          onChange={handleChange}
        />
        <button type="button" onClick={handleClick}>
          Get Weather
        </button>
      </div>
    </div>
  );
}

Search.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Search.defaultProps = {
  user: null,
};
