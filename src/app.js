import React from 'react';
import { hot } from 'react-hot-loader/root';
import example from './component/asset/IMG_1437.JPG';
import Overview from './component/overview/overview';

function App() {
  return (
    <div className='App'>
      Hello World
      <Overview />
    </div>
  );
}

export default hot(App);
// export default App;
