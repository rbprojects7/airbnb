import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import UpComeingPage from '../../components/UpComeingPage/UpComeingPage';

class Calendar extends React.Component {
    
    render() {

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <UpComeingPage />
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Calendar);