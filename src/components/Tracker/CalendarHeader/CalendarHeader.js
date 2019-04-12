import React from 'react';

import styles from './CalendarHeader.module.scss';

const CalendarHeader = props => (
  <div className={styles.CalendarHeader}><p>{props.text}</p></div>
)

export default CalendarHeader;