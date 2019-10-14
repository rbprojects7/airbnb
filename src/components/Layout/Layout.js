import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import CookiesDisclaimer from '../CookiesDisclaimer';

class Layout extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return (
            <div>
                <CookiesDisclaimer />
                <Header />
                <div className={s.layoutMinHeight}>{this.props.children}</div>
                <Footer />
            </div>
        );
    }
}

export default withStyles(s)(Layout);
