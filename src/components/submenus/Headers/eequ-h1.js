import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../style.css';

const TutorHereh1 = ({ children }) => (<div className={cx(s["TutorHere-h1"], s["TutorHere-h1-headline"])}>{children}</div>);

export default withStyles(s)(TutorHereh1);
