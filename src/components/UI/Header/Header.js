import React from 'react';

import styles from './Header.module.scss';

const Header = props => {
  return <h3 className={styles.Header}>{props.children}</h3>
}

export default Header;