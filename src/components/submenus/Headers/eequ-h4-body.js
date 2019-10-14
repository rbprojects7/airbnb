import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../style.css';

const TutorHereh4Body = ({ children }) => (<div className={cx(s["TutorHere-h4"], s["TutorHere-h4-body"])}>{children}</div>);

export default withStyles(s)(TutorHereh4Body);
