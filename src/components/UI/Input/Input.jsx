import React from 'react';

const input = (props) => {
  let inputField = null;
  switch (props.type) {
    case 'text':
      inputField = <input type="text" />;
      break;
    default:
      inputField = <input type="text" />;
  }

  return (
    <div className="inputWrapper">
      {inputField}
    </div>
  );
};

export default input;
