import React from 'react';

import CalendarHeader from './CalendarHeader/CalendarHeader';

import styles from './Tracker.module.scss'
const Tracker = props => {
  return (
    <div className={styles.Tracker}>
      <h1>Exercise & Fitness Tracker</h1>
      <div className={styles.CalendarWrapper}>
        <CalendarHeader text='Sunday' />
        <CalendarHeader text='Monday' /> 
        <CalendarHeader text='Tuesday' /> 
        <CalendarHeader text='Wednesday' /> 
        <CalendarHeader text='Thursday' /> 
        <CalendarHeader text='Friday' /> 
        <CalendarHeader text='Saturday' />       
        {props.children}
      </div>
    </div>
  )
}

export default Tracker;