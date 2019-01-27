import React from 'react';
import classes from './HomeSpecifications.module.css';

const homeSpecifications = props => (
  <div className={classes.hs}>
    <div>Bedrooms:{props.bath}</div>
    <div>Bathrooms:{props.bed}</div>
  </div>
);
export default homeSpecifications;
