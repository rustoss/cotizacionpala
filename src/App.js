import React, { Fragment, useState } from 'react';
import Login from './components/Login'

function App() {
  
  const [ bandlogin, guardarBandLogin ] = useState(false)

  return (
    <Fragment>
      {
        bandlogin 
        ? 
        'Logeado' 
        : 
        <Login
          guardarBandLogin={guardarBandLogin}
        />
      }
      
    </Fragment>
  );
}

export default App;
