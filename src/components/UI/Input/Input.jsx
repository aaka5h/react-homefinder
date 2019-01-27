import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputField = null;
  const inputClasses = [classes['input-wrapper']];
  switch (props.type) {
    case 'text':
      inputField = <input type="text" />;
      break;
    case 'select':
      const options = props.config.options.reduce((result, el) => {
        result.push(<option key={el.value} value={el.value}>{el.label}</option>);
        return result;
      }, []);
      inputClasses.push(classes['select-wrapper']);
      inputField = (
        <select
          onChange={props.changed}
          name={props.name}
        >
          {options}
        </select>
      );
      break;
    default:
      inputField = <input type="text" />;
  }

  return (
    <div className={inputClasses.join(' ')}>
      <label htmlFor="">{props.label}</label>
      {inputField}
    </div>
  );
};

export default input;
