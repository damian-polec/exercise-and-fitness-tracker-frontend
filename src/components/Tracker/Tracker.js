import React from 'react';

import Spinner from '../UI/Spinner/Spinner';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import CalendarNav from './CalendarNav/CalendarNav';

import styles from './Tracker.module.scss'
const Tracker = props => {
  const spinner = (
    <div className={styles.Spinner_Wrapper}>
      <Spinner design='Loader_Content'/>
    </div>
  )
  return (
    <div className={styles.Tracker}>
      <h1>Exercise & Fitness Tracker</h1>
      <CalendarNav
        month={props.month} 
        nextMonthHandler={props.nextMonthHandler}
        prevMonthHandler={props.prevMonthHandler}/>
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
      {props.isLoading ? spinner : null}
    </div>
  )
}

export default Tracker;