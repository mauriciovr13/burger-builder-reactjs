import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = ({active, link, children, exact}) => (
  <li className={classes.NavigationItem}>
    <NavLink 
      to={link}
      exact={exact}
      activeClassName={classes.active}
    >
      {children}
    </NavLink>
  </li>
);

NavigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.string
}

export default NavigationItem;