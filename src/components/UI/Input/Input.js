import React from 'react';

import styles from './Input.module.scss';

const Input = props => {
  let inputElement = null;
  switch(props.inputtype) {
    case('input'):
      inputElement = <input
      className={styles.InputElement}
      onChange={props.change}
       {...props.elementConfig} 
       value={props.value} />
      break;
    default:
      inputElement = <input
        className={styles.InputElement}
        onChange={props.change}
        {...props.elementConfig} 
        value={props.value} />
  }

  return (
    <div className={styles.Input}>
      <label
        className = {styles.Label} 
        htmlFor={props.elementConfig.name}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default Input;