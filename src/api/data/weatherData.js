import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const getUsersLocations = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/locations.json?orderBy="uid"&equalTo=${uid}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const addLocationToUser = (weatherObj, uid) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/locations.json`, weatherObj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbUrl}/locations/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getUsersLocations(uid).then(resolve);
        });
    })
    .catch(reject);
});

const getWeatherByZip = async (userInput) => {
  const zipCall = await axios.get(
    `api.openweathermap.org/data/2.5/weather?zip=${userInput}&appid=${apiKey}`,
  );
  return zipCall.data;
};

export { getUsersLocations, addLocationToUser, getWeatherByZip };
