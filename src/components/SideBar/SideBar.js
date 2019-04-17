import React from 'react';

import Goals from './Goals/Goals';
import Motivation from './Motivation/Motivation';
import Reward from './Reward/Reward';

import styles from './SideBar.module.scss';

const SideBar = props => {
  return (
    <div className={styles.SideBar}>
      <Goals onGoalsHandler={props.onGoalsHandler}/>
      <Motivation onMotivationHandler={props.onMotivationHandler}/>
      <Reward onRewardHandler={props.onRewardHandler}/>
    </div>
  )
}

export default SideBar;