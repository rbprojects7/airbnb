import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './style.css';

const noMobile = ({ children }) => (<div className={cx(s["mobile-hide"])}>{children}</div>);

export default withStyles(s)(noMobile);
