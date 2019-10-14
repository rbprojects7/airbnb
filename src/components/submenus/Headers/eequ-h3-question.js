import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../style.css';

const TutorHereh3Header = ({ children, style }) => (<div className={cx(s["TutorHere-h3"], s["TutorHere-h3-question"])}><div className={cx(s["TutorHere-h3"])} style={style}>{children}</div></div>);

export default withStyles(s)(TutorHereh3Header);
