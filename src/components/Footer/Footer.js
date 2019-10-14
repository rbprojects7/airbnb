import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    Grid,
    FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import LanguageSwitcher from '../LanguageSwitcher';
import CurrencySwitcher from '../CurrencySwitcher';
import Link from '../Link';
import CookiesDisclaimer from '../CookiesDisclaimer';

// Locale
import messages from '../../locale/messages';

class Footer extends React.Component {

    static propTypes = {
        siteName: PropTypes.string.isRequired,
        facebook: PropTypes.string,
        twitter: PropTypes.string,
        instagram: PropTypes.string,
        formatMessage: PropTypes.func,
    };

    render() {
        const { siteName, facebook, twitter, instagram } = this.props;
        return (
            <div className={s.root}>
                <CookiesDisclaimer />
                <div className={s.container}>
                    <div className={cx(s.footerSectionContainer, 'hidden-print')}>
                        <Grid fluid>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Col xs={12} sm={4} md={3} lg={3} className={cx(s.dropDownSection, s.smBottom)}>
                                        <p className={cx(s.captionLabel)}>The only person who is educated is the one who has learned how to learn and change</p>
                                        <p className={s.captionText}>-Carl Rogers</p>
                                    </Col>

                                    <Col xs={12} sm={8} md={8} lg={8} lgOffset={1} className={s.noPadding}>
                                        <Col xs={6} sm={3} md={3} lg={3}>
                                            <label className={s.landingLabel}>Company</label>
                                            <ul className={s.listContainer}>
                                                <li>
                                                    <Link to={'/about'} className={s.textLink} >About</Link>
                                                </li>
                                                <li>
                                                    <Link to={'/careers'} className={s.textLink} >Careers</Link>
                                                </li>
                                                <li>
                                                    <Link to={'/contact'} className={s.textLink} >Contact us</Link>
                                                </li>
                                            </ul>
                                        </Col>
                                        <Col xs={6} sm={3} md={3} lg={3}>
                                            <label className={s.landingLabel}>Platform</label>
                                            <ul className={s.listContainer}>
                                                <li>
                                                    <Link to={'/whymentor'} className={s.textLink}>Become a mentor</Link>
                                                </li>
                                                <li>
                                                    <Link to={'/whymentor/#TutorHere_social_mentors'} className={s.textLink}>Refer a mentor</Link>
                                                </li>
                                                <li>
                                                    <Link to={'/#TutorHere_social_icons'} className={s.textLink}>Invite a parent</Link>
                                                </li>
                                                <li>
                                                    <Link to={'/servicefees'} className={s.textLink}>Service fees</Link>
                                                </li>
                                                <li>
                                                    <Link to={'/cancellationprocess'} className={s.textLink}>Cancellation process</Link>
                                                </li>
                                            </ul>
                                        </Col>
                                        <Col xs={6} sm={3} md={3} lg={3}>
                                            <label className={s.landingLabel}>Approach</label>
                                            <ul className={s.listContainer}>
                                                <li>
                                                    <a href={'/strengths'} className={s.textLink} >Strengths</a>
                                                </li>
                                                <li>
                                                    <Link to={'/learningaims'} className={s.textLink} >Learning aims</Link>
                                                </li>
                                                <li>
                                                    <a href={'/reviewsystem'} className={s.textLink} >Review system</a>
                                                </li>
                                                <li>
                                                    <a href={'/sessionsandblocks'} className={s.textLink} >Sessions and blocks</a>
                                                </li>
                                                <li>
                                                    <a href={'/codesofconduct'} className={s.textLink} >Codes of conduct</a>
                                                </li>
                                            </ul>
                                        </Col>
                                        <Col xs={6} sm={3} md={3} lg={3}>
                                            <label className={s.landingLabel}>Resources</label>
                                            <ul className={s.listContainer}>
                                                <li>
                                                    <a href={'/riskassessments'} className={s.textLink}>Risk assessments</a>
                                                </li>
                                                <li>
                                                    <Link to={'/safeguarding'} className={s.textLink}>Safeguarding</Link>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
                <div className={cx(s.copyrightSection)}>
                    <Row className={s.maxWidthRow}>
                        <Col xs={6} sm={4} md={4} lg={4} className={s.footerBottomSection}>
                            <span className={s.copyrightSectionText}>© {siteName}.</span>
                        </Col>
                        <Col xs={6} sm={4} md={3} lg={3} className={s.noPadding}>
                            {
                                instagram && <a href={instagram} target="_blank" className={cx(s.shareIcon, s.xsHidden)}>
                                    <FontAwesome.FaInstagram />
                                </a>
                            }
                            {
                                twitter && <a href={twitter} target="_blank" className={cx(s.shareIcon, s.xsHidden)}>
                                    <FontAwesome.FaTwitter />
                                </a>
                            }
                            {
                                facebook && <a href={facebook} target="_blank" className={cx(s.shareIcon, s.xsHidden)}>
                                    <FontAwesome.FaFacebook />
                                </a>
                            }
                        </Col>
                        <Col xs={6} sm={4} md={4} lg={4} className={cx(s.noPadding, 'text-right', s.footerBottomSection)}>
                            <Row className={s.maxWidthRow}>
                                <Col xs={12} sm={4} md={4} lg={4} className={cx(s.noPadding, 'text-right', s.footerBottomSection)}>
                                    <a className={cx(s.textLink, s.copyrightSectionText)} href={'/terms'} target={'_blank'}>Terms</a>
                                </Col>
                                <Col xs={12} sm={4} md={4} lg={4} className={cx(s.noPadding, 'text-right', s.footerBottomSection)}>
                                    <a className={cx(s.textLink, s.copyrightSectionText)} href={'/privacy'} target={'_blank'}>Privacy</a>
                                </Col>
                                <Col xs={12} sm={4} md={4} lg={4} className={cx(s.noPadding, 'text-right', s.footerBottomSection)}>
                                    <a className={cx(s.textLink, s.copyrightSectionText)} href={'/cookies'} target={'_blank'}>Cookies</a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>

        );
    }
}


const mapState = state => ({
    siteName: state.siteSettings.data.siteName,
    facebook: state.siteSettings.data.facebookLink,
    twitter: state.siteSettings.data.twitterLink,
    instagram: state.siteSettings.data.instagramLink,
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(Footer));
