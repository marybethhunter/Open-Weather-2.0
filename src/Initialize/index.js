import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import SignIn from '../views/SignIn';
import LocationCards from '../components/LocationCards';
import Search from '../components/Search';

function Initialize() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userObj = {
          fullName: authed.displayName,
          uid: authed.uid,
        };
        setUser(userObj);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <>
          <LocationCards />
          <Search />
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
