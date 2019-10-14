import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../style.css';

const TutorHereContent = ({ children }) => (<div className={cx(s["TutorHere-content"])}>{children}</div>);

export default withStyles(s)(TutorHereContent);
