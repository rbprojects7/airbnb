import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './style.css';

const withMobile = ({ children }) => (<div className={cx(s["mobile-show"])}>{children}</div>);

export default withStyles(s)(withMobile);
