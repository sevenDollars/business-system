import React from 'react';

import './overview.less';
import SvgComponent from './SvgComponent';

function Overview() {
  console.log("isDev==", 1)
  return (
    <div className='overview'>
      概览
      <SvgComponent />
    </div>
  );
}

export default Overview;
