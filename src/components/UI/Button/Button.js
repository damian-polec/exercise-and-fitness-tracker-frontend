import React from 'react';

import styles from './Button.module.scss'

const Button = props => (
  <button
    className={styles[props.design]}
    disabled={props.disabled}>{props.children}</button>
)

export default Button;