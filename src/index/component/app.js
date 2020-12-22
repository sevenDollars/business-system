import React from 'react';

import './app.less';
import Demo from 'common/demo/demo';
import photo from '../../assign/images/photo.JPG';

function App() {
  return (
    <div id="app">
      <div className="app-text">app 1</div>
      <img src={photo} alt="" />
      <Demo />
    </div>
  );
}

export default App;
