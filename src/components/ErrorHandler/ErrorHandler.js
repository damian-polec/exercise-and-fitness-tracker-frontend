import React, { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';

import styles from './ErrorHandler.module.scss';

const ErrorHandler = props => (
  <Fragment>
    {props.error && <Backdrop onClick={props.onHandle} />}
    {props.error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={props.onHandle}
        onAcceptModal={props.onHandle}
        acceptEnabled
      >
        <p className={styles.Error_Message}>{props.error.message}</p>
      </Modal>
    )}
  </Fragment>
);

export default ErrorHandler;
