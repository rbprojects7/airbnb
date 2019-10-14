import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../style.css';

const LayoutContainer = ({ children }) => (<div className={cx(s["TutorHere-wrapper"])}>{children}</div>);

export default withStyles(s)(LayoutContainer);
