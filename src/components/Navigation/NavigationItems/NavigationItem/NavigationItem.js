import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItem.module.css';

const NavigationItem = ({active, link, children}) => (
  <li className={classes.NavigationItem}>
    <a
      className={active ? classes.active : null}
      href={link}
    >
      {children}
    </a>
  </li>
);

NavigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.string
}

export default NavigationItem;