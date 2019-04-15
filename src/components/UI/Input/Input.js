import React from 'react';

import styles from './Input.module.scss';

const Input = props => {
  let validationError = null;
  let inputElement = null;

  if(props.invalid && props.isTouched) {
    validationError = <p className={styles.Validation_Error}>Cannot be empty</p>
  }
  if(props.invalid && props.validationType.isEmail && props.isTouched) {
    validationError = <p className={styles.Validation_Error}>Invalid Email</p>
  }
  if(props.invalid && props.validationType.isPassword && props.isTouched) {
    validationError=<p className={styles.Validation_Error}>Password should be at least 6 characters long</p>
  }
  if(props.invalid && props.validationType.isEqual && props.isTouched) {
    validationError = <p className={styles.Validation_Error}>Have to be equal to password</p>
  }
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
      {validationError}
      {inputElement}
    </div>
  )
}

export default Input;