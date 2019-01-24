import React from 'react';

import classes from './Home.module.css';

const home = (props) => {
  // console.log(props);
  return (
    <div className={classes.home}>
      <div>
        Home:{props.id}
      </div>
      <div>
        {props.address}
      </div>
    </div>
  );
};


export default home;
