/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.module.css';

const BuildControl = ({ label, removed, disabled, added }) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{label}</div>
    <button className={classes.Less} onClick={removed} disabled={disabled}>
      Less
    </button>
    <button className={classes.More} onClick={added}>
      More
    </button>
  </div>
);

BuildControl.propTypes = {
  label: PropTypes.string,
  removed: PropTypes.func,
  disabled: PropTypes.bool,
  added: PropTypes.func,
};

export default BuildControl;
