import React from 'react';
import { Link } from 'react-router-dom';

import classes from './HomeCard.module.css';
import HomeImage from './HomeImage/HomeImage';
import HomeSpecification from './HomeSpecifications/HomeSpecifications';
import skeletonProvider from '../../hoc/skeleton/skeletonProvider/skeletonProvider';
import { createSkeletonElement } from '../../hoc/skeleton/skeletonElement/skeletonElement';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});
const Div = createSkeletonElement('div', 'pending-home');

const homeCard = props => (
  <Div>
    <div className={classes.home}>
      <HomeImage src={props.image} alt={props.name} />
      <div>{formatter.format(props.price)}</div>
      <div>
        {props.name}:
        {props.id}
      </div>
      <div>
        {props.address}
      </div>
      <HomeSpecification bath={props.bathRooms} bed={props.bedRooms} />
      <Link to={`/home/${props.id}`} className={classes['detail-button']}>
        <button>Detail</button>
      </Link>
    </div>
  </Div>
);
export default skeletonProvider(null, () => true, null)(homeCard);
