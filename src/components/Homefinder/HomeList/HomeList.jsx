import React from 'react';

import Home from '../../homes/Home/Home';
import classes from './HomeList.module.css';

const homeList = (props) => {
  const homesArr = [];
  for (const home of props.homes) {
    homesArr.push(<Home key={home.id} {...home} />);
  }

  return (
    <>
      <div className={classes['home-list']}>
        {homesArr}
      </div>
      {props.loading ? <div>Loading</div> : null}
    </>
  );
};

export default homeList;
