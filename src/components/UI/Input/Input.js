import React from 'react';

import styles from './Input.module.scss';

const Input = props => {
  let inputElement = null;
  switch(props.elementType) {
    case( 'input' ):
      inputElement = <input
      className={styles.InputElement}
      onChange={props.change}
       {...props.elementConfig} 
       value={props.value} />
      break;
    case( 'select' ):
      inputElement = (
        <select
          className={styles.Select_Element}
          value={props.value}
          onChange={props.change}>
            {props.elementConfig.options.map(option => (
              <option
                key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
        </select>
      );
      break;
    default:
      inputElement = <input
        className={styles.InputElement}
        onChange={props.change}
        {...props.elementConfig} 
        value={props.value} />
  }

  return (
    <div className={[styles.Input, styles[props.design]].join(' ')}>
      <label
        className={styles.Label} 
        htmlFor={props.elementConfig.name}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default Input;