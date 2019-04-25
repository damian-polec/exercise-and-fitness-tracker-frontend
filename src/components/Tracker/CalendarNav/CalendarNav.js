import React from 'react';

import Button from '../../UI/Button/Button';

import styles from './CalendarNav.module.scss';

const calendarNav = (props) => {
  const date = new Date(new Date().getFullYear(), props.month, 1);
  const monthName = date.toLocaleString('en-us', { month: 'long'});
  const year = date.getFullYear();
  return (
    <div className={styles.Calendar_Nav}>
      <Button
        onClick={props.prevMonthHandler}
        design='Month_Nav_Button'>Previous Month</Button>
      <h2 className={styles.Month_Name}>{monthName} {year}</h2>
      <Button
        onClick={props.nextMonthHandler}
        design='Month_Nav_Button'>Next Month</Button>
    </div>
  )
}

export default calendarNav;