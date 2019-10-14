import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../style.css';

const HorizontalImage = ({ imgSrc, caption }) => (<div className={cx(s["TutorHere-image-caption-horizontal-center"])}>
    <img alt={caption} src={imgSrc} className={cx(s["TutorHere-image-horizontal-center"])} />
    <span className={cx(s["TutorHere-caption-horizontal-center"])}>{caption}</span>
</div>);

export default withStyles(s)(HorizontalImage);
