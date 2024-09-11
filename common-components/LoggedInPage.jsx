import React from 'react';
import WelcomeUser from './WelcomeUser';

const LoggedInPage = () => {
  const loggedInUsername = ""; 
  return (
    <div>
      <WelcomeUser username={loggedInUsername} />
     
    </div>
  );
};

export default LoggedInPage;
