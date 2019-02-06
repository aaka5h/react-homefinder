import React from 'react';
import classes from './HomeSpecifications.module.css';

const homeSpecifications = props => {
  const cl = props.className;
  return (<div className={[classes.hs, cl].join(' ')}>
    <div>Bedrooms:{props.bath}</div>
    <div>Bathrooms:{props.bed}</div>
  </div>);
};
export default homeSpecifications;
