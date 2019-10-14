import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationAfterLogin.css';
import * as FontAwesome from 'react-icons/lib/fa';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';

// Internal Components
import Link from '../Link';
import NavLink from '../NavLink';
import MenuItemLink from '../MenuItemLink';
import Avatar from '../Avatar';
import Logout from '../Logout';
import Message from '../Message';
import WishListModal from '../WishListModal';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

import { graphql, gql, compose } from 'react-apollo';

class NavigationAfterLogin extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        setUserLogout: PropTypes.func,
        formatMessage: PropTypes.func,
        getCheckSession: PropTypes.shape({
            loading: PropTypes.bool,
            checkSession: PropTypes.object
        }).isRequired
    };

    componentWillReceiveProps(nextProps) {
        const { getCheckSession: { checkSession, loading } } = nextProps;
        if(!loading && checkSession && checkSession.status == '400') {
            window.location = '/login';
        }
    }

    render() {
        const { className, setUserLogout, wishListModal } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <Nav pullRight>
                <NavLink to="/" className={'visible-xs'}>
                    <FormattedMessage {...messages.home} />
                </NavLink>
                <NavLink to="/s" >
                <FormattedMessage {...messages.searchExperiences} />
        </NavLink>
                <NavDropdown className={cx('hidden-xs')} eventKey={3} title={formatMessage(messages.host)} noCaret id="basic-nav-dropdown">
                    <MenuItemLink to="/whymentor">
                        <FormattedMessage {...messages.whyMentor} />
                    </MenuItemLink>
                    <MenuItemLink to="/experience">
                        <FormattedMessage {...messages.manageListing} />
                    </MenuItemLink>
                    <MenuItemLink to="/become-a-mentor?mode=new">
                        <FormattedMessage {...messages.listYourSpace} />
                    </MenuItemLink>
                    <MenuItemLink to="/reservation/current">
                        <FormattedMessage {...messages.yourReservations} />
                    </MenuItemLink>
                    <MenuItemLink to="/user/transaction">
                        <FormattedMessage {...messages.transactionHistory} />
                    </MenuItemLink>
                </NavDropdown>
                <NavLink to="/inbox" className={'visible-xs'}>
                    Messages
                </NavLink>
                <NavLink to="/experiences/current" className={cx('visible-xs')}>
                    Manage Learning
                </NavLink>
                <NavLink to="/experience" className={'visible-xs'}>
                    Manage Listings
                </NavLink>
                <NavLink to="/user/edit">
                    Profiles
                </NavLink>
                <NavLink to="/inbox" className="hidden-xs hidden-sm">
                    <FormattedMessage {...messages.messages} />
                </NavLink>
                <NavLink to="/user/payout" className="hidden-md hidden-lg">
                    <FormattedMessage {...messages.accountSettings} />
                </NavLink>
                <Logout className={cx('visible-xs')} />
                <NavDropdown
                  className={cx('hidden-xs')} eventKey={3} title={
                      <Avatar
                        isUser
                        type={'small'}
                        height={30}
                        width={30}
                        className={s.userAvatar}
                      />
          } noCaret id="basic-nav-dropdown"
                >
                    <MenuItemLink to="/dashboard">
                        <FormattedMessage {...messages.dashboard} />
                    </MenuItemLink>
                    <MenuItemLink to="/user/edit">
                        <FormattedMessage {...messages.adultProfile} />
                    </MenuItemLink>
                    <MenuItemLink to="/user/editChild">
                        <FormattedMessage {...messages.childProfile} />
                    </MenuItemLink>
                    <MenuItemLink to="/inbox">
                        <FormattedMessage {...messages.messages} />
                    </MenuItemLink>
                    <Logout />
                </NavDropdown>
                {
          wishListModal && <WishListModal />
        }
            </Nav>
        );
    }

}

const mapState = state => ({
    wishListModal: state.modalStatus.wishListModalOpen
});

const mapDispatch = {
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
    query checkSession{
      checkSession {
        status
      }
    }
  `, {
      name: 'getCheckSession',
      options: {
          ssr: false,
          pollInterval: 5000,
      },
  })
)(NavigationAfterLogin);
