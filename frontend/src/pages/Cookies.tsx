import React from 'react';
import Cookies, { Cookie } from 'universal-cookie';

const MyComponent: React.FC = () => {
  const cookies = new Cookies();

  // Set a cookie
  cookies.set('userToken', 'exampleToken123', { path: '/' });

  // Get a cookie
  const userToken = cookies.get('userToken');

  return (
    <div>
      <p>User Token: {userToken}</p>
    </div>
  );
};

export default MyComponent;