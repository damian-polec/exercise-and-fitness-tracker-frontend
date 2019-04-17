import React from 'react';

import styles from './Input.module.scss';

const Input = props => {
  let validationError = null;
  let inputElement = null;
  const inputStyles = [styles.InputElement]
  const textareaStyles = [styles.Textarea_Element]
  if(props.formType === 'Note') {
    if(props.invalid && props.isTouched && props.validationType.isTime) {
      inputStyles.push(styles.Input_Invalid);
    }
  } else {
    if(props.invalid && props.isTouched) {
      validationError = <p className={styles.Validation_Error}>Cannot be empty</p>
      inputStyles.push(styles.Input_Invalid);
    }
    if(props.invalid && props.validationType.isEmail && props.isTouched) {
      validationError = <p className={styles.Validation_Error}>Invalid Email</p>
      inputStyles.push(styles.Input_Invalid);
    }
    if(props.invalid && props.validationType.isPassword && props.isTouched) {
      validationError=<p className={styles.Validation_Error}>Password should be at least 6 characters long</p>
      inputStyles.push(styles.Input_Invalid);
    }
    if(props.invalid && props.validationType.isEqual && props.isTouched) {
      validationError = <p className={styles.Validation_Error}>Have to be equal to password</p>
      inputStyles.push(styles.Input_Invalid);
    }
  }
  switch(props.elementType) {
    case( 'input' ):
      inputElement = <input
      className={inputStyles.join(' ')}
      onChange={props.change}
       {...props.elementConfig} 
       value={props.value} />
      break;
    case( 'textarea' ):
      inputElement = <textarea
        className={textareaStyles.join(' ')}
        {...props.elementConfig}
        onChange={props.change}
        value={props.value}
        />
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
    case( 'filePicker' ):
      inputElement = <input 
        id={props.id}
        className={styles.File_Picker}
        {...props.elementConfig}
        onChange={props.change}
        value={props.value} 
        />
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
        className={props.elementType === 'filePicker' ? [styles.Label, styles.File_Picker_Label].join(' ') : styles.Label} 
        htmlFor={props.elementConfig.name}
        onClick={props.onClick}>{props.label}</label>
      {validationError}
      {inputElement}
    </div>
  )
}

export default Input;