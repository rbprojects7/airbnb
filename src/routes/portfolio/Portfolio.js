import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Portfolio.css';
import UpComeingPriviousPage from '../../components/UpComeingPriviousPage/UpComeingPriviousPage';

class Portfolio extends React.Component {
    
    render() {

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <UpComeingPriviousPage />
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Portfolio);