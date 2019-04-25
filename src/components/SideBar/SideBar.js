import React from 'react';

import Goals from './Goals/Goals';
import Motivation from './Motivation/Motivation';
import Reward from './Reward/Reward';

import styles from './SideBar.module.scss';

const SideBar = props => {
  return (
    <div className={styles.SideBar}>
      <Goals 
        onGoalsHandler={props.onGoalsHandler}
        isLoading={props.isLoading}
        goals={props.goals}/>
      <Motivation 
        onMotivationHandler={props.onMotivationHandler}
        isLoading={props.isLoading}
        motivation={props.motivation}/>
      <Reward 
        onRewardHandler={props.onRewardHandler}
        reward={props.reward}/>
    </div>
  )
}

export default SideBar;