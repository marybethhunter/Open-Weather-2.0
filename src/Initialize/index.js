import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import SignIn from '../views/SignIn';
import LocationCards from '../components/LocationCards';
import Search from '../components/Search';
import { getUsersLocations } from '../api/data/weatherData';

function Initialize() {
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [weatherObj, setWeatherObj] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userObj = {
          fullName: authed.displayName,
          uid: authed.uid,
        };
        setUser(userObj);
        getUsersLocations(authed.uid).then((locationArr) => {
          setLocations(locationArr);
        });
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <>
          {locations.map((location) => (
            <div key={location.firebaseKey}>
              <LocationCards location={location} />
            </div>
          ))}
          <Search weatherObj={weatherObj} setWeatherObj={setWeatherObj} />
        </>
      ) : (
        <>
          <SignIn user={user} />
        </>
      )}
    </>
  );
}

export default Initialize;
