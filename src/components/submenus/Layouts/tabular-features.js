import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from '../style.css';

const TabularFeatures = ({ children, type }) => (<div className={type === 'left' ? cx(s["TutorHere-tabular-content-left"]) : cx(s["TutorHere-tabular-content-right"])}>{children}</div>);

TabularFeatures.propTypes = {
    type: PropTypes.string.isRequired,
};

export default TabularFeatures;
