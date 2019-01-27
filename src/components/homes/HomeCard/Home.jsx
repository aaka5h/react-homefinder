import React from 'react';

import classes from './Home.module.css';
import HomeImage from './HomeImage/HomeImage';
import HomeSpecification from './HomeSpecifications/HomeSpecifications';
import {Link} from "react-router-dom";

const home = props => (
  <div className={classes.home}>
    <HomeImage src={props.image} alt={props.name}/>
    <div>
      {props.name}:
      {props.id}
    </div>
    <div>
      {props.address}
    </div>
    <HomeSpecification bath={props.bathRooms} bed={props.bedRooms}/>
    <Link to={`/home/${props.id}`} className={classes["detail-button"]}>
      <button>Detail</button>
    </Link>
  </div>
);
export default home;
