import React from 'react';

import styles from './CalendarSquare.module.scss';
const CalendarSquare = props => (
  <div 
    className={styles.CalendarSquare}
    onClick={props.click}>{props.day}</div>
)

export default CalendarSquare;