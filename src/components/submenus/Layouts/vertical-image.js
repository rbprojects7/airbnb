import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import closeImg from './cross.svg';
import s from '../style.css';

const VerticalImage = ({ imgSrc, caption, closeType, onClose }) => (<div style={{ marginBottom: 15 }}>
    <img alt={caption} className={cx(s["TutorHere-image-horizontal-center"])} style={{ verticalAlign: 'middle', marginRight: 15 }} src={imgSrc} />
    <span>{caption}</span>
    {closeType ? <span style={{ float: 'right', cursor: 'pointer', height: 65, position: 'relative' }} onClick={onClose}><img alt="close" src={closeImg} style={{ width: 14, height: 14, position: 'absolute', top: 0, bottom: 0, margin: 'auto' }} /></span> : null}
</div>);

export default withStyles(s)(VerticalImage);
