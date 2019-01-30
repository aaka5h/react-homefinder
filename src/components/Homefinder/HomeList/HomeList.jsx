import React from 'react';

import HomeCard from '../../homes/HomeCard/HomeCard';
import classes from './HomeList.module.css';
import { createSkeletonElement } from '../../hoc/skeleton/skeletonElement/skeletonElement';

const homeList = (props) => {
  const homesArr = [];
  for (const home of props.homes) {
    homesArr.push(<HomeCard key={home.id} {...home} />);
  }

  const Div = createSkeletonElement('div', 'class-skeleton-element');

  return (
    <Div>
      <div ref={props.listRef} className={classes['home-list']}>
        {homesArr}
      </div>
      <button type="button" onClick={props.loadMore}>loadMore</button>
      {props.loading ? <div>Loading</div> : null}
    </Div>
  );
};

export default homeList;
