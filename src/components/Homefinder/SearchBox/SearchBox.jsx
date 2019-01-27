import React from 'react';

import Input from '../../UI/Input/Input';
import classes from './SearchBox.module.css';

const searchBox = (props) => {
  const formItems = [];
  Object.keys(props.form).forEach((key) => {
    formItems.push(
      <Input
        key={key}
        name={key}
        changed={(event) => props.valueChanged(event, key)}
        {...props.form[key]}
      />,
    );
  });

  return (
    <form onSubmit={event => props.search(event)} className={classes['search-box']}>
      {formItems}
      <button type="submit">Search</button>
    </form>
  );
};

export default searchBox;
