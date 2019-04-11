import React, { Component } from 'react';

import SideBar from '../../components/SideBar/SideBar';
import Tracker from '../../components/Tracker/Tracker';

import styles from './ExerciseTracker.module.scss';

class ExerciseTracker extends Component {
  render() {
    return (
      <div className={styles.ExerciseTracker}>
        <SideBar />
        <Tracker />
      </div>
    )
  }
}

export default ExerciseTracker;