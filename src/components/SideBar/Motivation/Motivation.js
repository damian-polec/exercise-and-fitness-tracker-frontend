import React from 'react';

import Header from '../../UI/Header/Header';
import styles from './Motivation.module.scss';

const Motivation = props => {
  return (
    <div className={styles.Motivation}>
      <Header>Motivation</Header>
      <h3>Motivational Quote Of The Month</h3>
    </div>
  )
}

export default Motivation;