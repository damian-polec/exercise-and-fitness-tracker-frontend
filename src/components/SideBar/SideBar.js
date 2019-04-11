import React from 'react';

import Goals from './Goals/Goals';
import Motivation from './Motivation/Motivation';
import Reward from './Reward/Reward';

import styles from './SideBar.module.scss';

const SideBar = props => {
  return (
    <div className={styles.SideBar}>
      <Goals />
      <Motivation />
      <Reward />
    </div>
  )
}

export default SideBar;