import React from 'react';

import HomeCard from '../../homes/HomeCard/HomeCard';
import classes from './HomeList.module.css';
import { createSkeletonElement } from '../../hoc/skeleton/skeletonElement/skeletonElement';

const homeList = (props) => {
  const { skeleton: loading, listRef: ref, loadMore } = props;
  let homesArr = [];
  for (const home of props.homes) {
    homesArr.push(<HomeCard key={home.id} {...home} />);
  }

  console.log({ loading });
  if (loading) {
    const placeHolder = new Array(10)
      .fill(1).map(i => Math.random().toFixed(5))
      .map(value => <HomeCard key={value} />);
    console.log('loading:', placeHolder);
    homesArr = homesArr.concat(placeHolder);
  }

  return (
    <>
      <div ref={ref} className={classes['home-list']}>
        {homesArr}
      </div>
      <button type="button" onClick={loadMore}>loadMore</button>
      {loading ? <div>Loading</div> : null}
    </>
  );
};

export default createSkeletonElement(homeList, 'home-list');
