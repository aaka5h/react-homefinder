import React from 'react';

import Input from '../../UI/Input/Input';

const searchBox = props => (
  <form onSubmit={(event) => props.search(event)}>
    <Input type="text" />
    <button type="submit">Search</button>
  </form>
);

export default searchBox;
