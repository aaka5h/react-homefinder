import React from 'react';

import classes from './HomeImage.module.css';

const homeImage = props => (
  <div className={classes['home-image']}>
    <img alt={props.alt} src={props.src} />
  </div>
);
export default homeImage;
