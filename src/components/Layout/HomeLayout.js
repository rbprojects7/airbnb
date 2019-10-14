import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class HomeLayout extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return (
            <div>
                <Header borderLess />
                <div className={s.layoutMinHeight}>{this.props.children}</div>
                <Feedback />
                <Footer />
            </div>
        );
    }
}

export default withStyles(s)(HomeLayout);
