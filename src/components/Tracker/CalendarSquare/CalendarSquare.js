import React from 'react';

import styles from './CalendarSquare.module.scss';
const CalendarSquare = props => {
  let style = [styles.CalendarSquare];
  if(!props.exercise) {
    style.push(styles.PastMonthDay)
  } else if(props.exercise.length < 1 && new Date() >= new Date(props.year, props.month, props.day)) {
    style.push(styles.CalendarTest)
  } else if (props.exercise.length > 0 && new Date() >= new Date(props.year, props.month, props.day)) {
    style.push(styles.CalendarTest2)
  }
  return (
    <div 
      className={style.join(' ')}
      onClick={props.click}>{props.day}</div>
  )
}

export default CalendarSquare;