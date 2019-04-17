import React from 'react';

import Header from '../../UI/Header/Header';
import Button from '../../UI/Button/Button';
import styles from './Reward.module.scss';

const Reward = props => {
  return (
    <div className={styles.Reward}>
      <Header>Reward</Header>
      <h3>(Reward At End Of The Month)</h3>
      <Button 
        design='SideBar_Button'
        onClick={props.onRewardHandler}>Add Reward</Button>
    </div>
  )
}

export default Reward;