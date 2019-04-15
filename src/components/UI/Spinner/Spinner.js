import React from 'react';

import styles from './Spinner.module.scss';

const Spinner = props => (
  <div className={styles[props.design]}></div>
)

export default Spinner;