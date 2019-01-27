import React from 'react';

import HomeCard from '../../homes/HomeCard/HomeCard';
import classes from './HomeList.module.css';

const homeList = (props) => {
  const homesArr = [];
  for (const home of props.homes) {
    homesArr.push(<HomeCard key={home.id} {...home} />);
  }

  return (
    <>
      <div className={classes['home-list']}>
        {homesArr}
      </div>
      <button onClick={props.loadMore}>loadMore</button>
      {props.loading ? <div>Loading</div> : null}
    </>
  );
};

export default homeList;
