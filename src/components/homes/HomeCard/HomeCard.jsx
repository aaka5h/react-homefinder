import React from 'react';
import { Link } from 'react-router-dom';

import classes from './HomeCard.module.css';
import HomeImage from './HomeImage/HomeImage';
import HomeSpecification from './HomeSpecifications/HomeSpecifications';
import { createSkeletonElement } from '../../hoc/skeleton/skeletonElement/skeletonElement';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

const homeCard = (props) => {
  const cardClasses = [classes.home, props.className];

  return (
    <div className={cardClasses.join(' ')}>
      <HomeImage src={props.image} alt={props.name} />
      <div>{formatter.format(props.price)}</div>
      <div>
        {`${props.name}:${props.id}`}
      </div>
      <div>
        {props.address}
      </div>
      <HomeSpecification bath={props.bathRooms} bed={props.bedRooms} />
      <Link to={`/home/${props.id}`} className={classes['detail-button']}>
        <button type="button">Detail</button>
      </Link>
    </div>
  );
};
export default createSkeletonElement(homeCard, 'loading-home');
