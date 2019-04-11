import React from 'react';

import Header from '../../UI/Header/Header';
import styles from './Reward.module.scss';

const Reward = props => {
  return (
    <div className={styles.Reward}>
      <Header>Reward</Header>
      <h3>(Reward At End Of The Month)</h3>
    </div>
  )
}

export default Reward;