import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';

const Layout = (props) => (
  <Aux>
    <div>Toolbar, Sidebar, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
    {console.log(classes)}
  </Aux>
); 

export default Layout;