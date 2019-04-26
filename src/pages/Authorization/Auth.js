import React from 'react';

import styles from './Auth.module.scss';

const Auth = props => (
  <div className={styles.Auth}>{props.children}</div>
)

export default Auth;