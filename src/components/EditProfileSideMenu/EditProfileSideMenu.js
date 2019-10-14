import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditProfileSideMenu.css';
import {
    Button,
    Col } from 'react-bootstrap';
import cx from 'classnames';

// Component
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

class EditProfileSideMenu extends React.Component {
    render() {
        return (
            <div>
                <ul className={s.listContainer}>
                    <li>
                        <Link to={"/user/edit"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.editAdultProfile} />
                        </Link>
                    </li>
                    <li>
                        <Link to={"/user/photo"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.profilePhoto} />
                        </Link>
                    </li>
                    <li>
                        <Link to={"/user/editChild"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.editChildProfile} />
                        </Link>
                    </li>
                    <li>
                        <Link to={"/user/verification"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.trustAndVerification} />
                        </Link>
                    </li>
                </ul>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.space3, s.spaceTop2)} >
                    <Link to={"/users/show"} className={cx(s.button, s.btnPrimary, s.btnlarge)}>
                        <FormattedMessage {...messages.viewProfile} />
                    </Link>
                </Col>
            </div>
        );
    }
}

export default withStyles(s)(EditProfileSideMenu);
