import React from 'react';
import './app.less';
import photo from '../../assign/images/photo.JPG';

function App() {
  return (
    <div id='app'>
      <div className='app-text'>app</div>
      <img src={photo} />
    </div>
  );
}

export default App;
