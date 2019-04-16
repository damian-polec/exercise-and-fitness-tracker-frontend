import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../UI/Button/Button';

import styles from './Nav.module.scss';

const Nav = props => {
  let links = (
    <Fragment>
      {/* <Button design='Nav_Link'>My Goals</Button>
      <Button design='Nav_Link'>Motivation</Button>
      <Button design='Nav_Link'>Reward</Button> */}
      <Button 
        design='Nav_Link'
        onClick={props.onLogout}>Logout</Button>
    </Fragment>
  );
  if(!props.isAuth) {
    links = (
      <Fragment>
        <NavLink 
          className={styles.Nav_Link} 
          activeClassName={styles.active} 
          to='/login'>Login</NavLink>
        <NavLink 
          className={styles.Nav_Link} 
          activeClassName={styles.active} 
          to='/signup'>Sign Up</NavLink>
      </Fragment>
    )
  }
  return (
    <div className={styles.Nav}>
      {links}
    </div>
  )
}

export default Nav;