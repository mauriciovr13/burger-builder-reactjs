import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

const SideDrawer = ({open, closed}) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={open} clicked={closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool,
  closed: PropTypes.func,
}

export default SideDrawer;