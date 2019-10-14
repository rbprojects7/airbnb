import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../style.css';

const svgImage = ({ children }) => (<div className={cx(s["TutorHere-svg-icon"])}>{children}</div>);

export default withStyles(s)(svgImage);
