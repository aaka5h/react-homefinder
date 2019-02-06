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

const handlers = {
  address: value => <div>{value}</div>,
};

const homeCard = (props) => {
  const cardClasses = [classes.home];
  // will also remove explictly added classes
  if (!props.id && props.skeleton) cardClasses.push(classes['pending-data']);

  return (
    <div className={cardClasses.join(' ')}>
      <HomeImage src={props.image} alt={props.name} />
      <div className={classes['home-details']}>
        <div className={classes['detail-item']}>{!!props.price && formatter.format(props.price)}</div>
        <div className={classes['detail-item']}>
          {`${!!props.name && props.name}:${!!props.id && props.id}`}
        </div>
        <div className={classes['detail-item']}>
          {props.address}
        </div>
        <HomeSpecification bath={props.bathRooms} className={classes['detail-item']} bed={props.bedRooms} />
        <Link to={`/home/${props.id}`} className={[classes['detail-button'], classes['detail-item']].join(' ')}>
          <button type="button">Detail</button>
        </Link>
      </div>
    </div>
  );
};
export default createSkeletonElement(homeCard, classes['pending-data']);
