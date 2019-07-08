import React from 'react';

import HomeCard from '../../homes/HomeCard/HomeCard';
import classes from './HomeList.module.css';
import { createSkeletonElement } from '../../hoc/skeleton/skeletonElement/skeletonElement';

const homeList = (props) => {
  const { skeleton: loading, listRef: ref, loadMore, searching, totalResults } = props;
  let homesArr = [];
  for (const home of props.homes) {
    homesArr.push(<HomeCard key={home.id} {...home} />);
  }

  console.log({ loading });
  if (loading) {
    const placeHolder = new Array(10)
      .fill(1).map(i => Math.random().toFixed(5))
      .map(value => <HomeCard className="loading-home" key={value} />);
    console.log('loading:', placeHolder);
    homesArr = homesArr.concat(placeHolder);
  }

  return (
    <div className={classes['home-list-wrapper']}>
      <div ref={ref} className={classes['home-list']}>
        {homesArr}
      </div>
      {totalResults}
      {!(searching || loading) && props.homes.length < totalResults ? <button type="button" onClick={loadMore}>loadMore</button> : null}
      {searching ? <div className={classes['searching']}>Loading</div> : null}
    </div>
  );
};

export default createSkeletonElement(homeList, classes['pending-home-list']);
