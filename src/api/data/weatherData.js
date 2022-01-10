import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const getUsersLocations = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/locations.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const addLocationToUser = (weatherObj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/locations.json`, weatherObj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbUrl}/locations/${firebaseKey}.json`, { firebaseKey })
        .then(resolve);
    })
    .catch(reject);
});

const getWeatherByZip = (userInput) => new Promise((resolve, reject) => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${userInput}&appid=${apiKey}`,
    )
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export { getUsersLocations, addLocationToUser, getWeatherByZip };
