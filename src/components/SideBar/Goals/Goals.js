import React from 'react';

import Header from '../../UI/Header/Header';
import styles from './Goals.module.scss';

const Goals = props => {
  return (
    <div className={styles.Goals}>
      <Header>My Goals</Header>
      <ol className={styles.GoalsList}>
        <li>adasd</li>
        <li>asdasd</li>
        <li>asdasd</li>
      </ol>
    </div>
  )
}

export default Goals;