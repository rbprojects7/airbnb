import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../style.css';

const TutorHereh3 = ({ children }) => (<div className={cx(s["TutorHere-h3-introduction"])}><div className={cx(s["TutorHere-h3"])}>{children}</div></div>);

export default withStyles(s)(TutorHereh3);
