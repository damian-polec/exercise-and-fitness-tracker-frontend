import React from 'react';

import Header from '../../UI/Header/Header';
import Button from '../../UI/Button/Button';
import styles from './Motivation.module.scss';

const Motivation = props => {
  return (
    <div className={styles.Motivation}>
      <Header>Motivation</Header>
      <h3>{props.motivation}</h3>
      <Button 
        design='SideBar_Button'
        onClick={props.onMotivationHandler}>Add Quote</Button>
    </div>
  )
}

export default Motivation;