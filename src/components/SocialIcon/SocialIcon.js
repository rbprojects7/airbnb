import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialIcon.css';
import { FormattedMessage } from 'react-intl';
// Locale
import messages from '../../locale/messages';
import { url,whyMentorUrl } from '../../config';
import {
    Row,
    Col,
    Grid,
} from 'react-bootstrap';

import * as FontAwesome from 'react-icons/lib/fa';
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TumblrShareButton,
    TumblrIcon,
    GooglePlusShareButton,
    GooglePlusIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    MailruShareButton,
} from 'react-share';


class SocialIcon extends Component {

    render() {
        const mailContent = `${"mailto" + ":"}?subject=TutorHere&body=Anyone can become a mentor.Learning experiences are activities, projects and tutorials that are provided by local people who have a skill or passion to share with a child. You don’t have to be a trained teacher to offer a valuable learning experience ${whyMentorUrl}`;
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col id="TutorHere_social_mentors" md={12} lg={12} xs={12} sm={12}>
                            <div className={cx(s.container, s.titleCenter)}>
                                <h3 className={cx(s.titleText, s.blockInline)}>Spread the word</h3>
                                <div className={cx(s.blockInline, s.spaceTop)}>
                                    {/* <span className={s.spaceIcon}>
                                        <a className={s.socialLink}><FontAwesome.FaFacebook /></a>
                                    </span>
                                    <span className={s.spaceIcon}>
                                        <a className={s.socialLink}><FontAwesome.FaWhatsapp /></a>
                                    </span>
                                    <span className={s.spaceIcon}>
                                        <a className={s.socialLink}><FontAwesome.FaTwitter /></a>
                                    </span>
                                    <span className={s.spaceIcon}>
                                        <a className={s.socialLink}><FontAwesome.FaTumblr /></a>
                                    </span>
                                    <span className={s.spaceIcon}>
                                        <a className={s.socialLink}><FontAwesome.FaGooglePlus /></a>
                                    </span>
                                    <span className={s.spaceIcon}>
                                        <a className={s.socialLink}><FontAwesome.FaEnvelope /></a>
                                    </span> */}

                                    <FacebookShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={whyMentorUrl}
                                    >
                                        <FontAwesome.FaFacebook />
                                    </FacebookShareButton>

                                    <WhatsappShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={whyMentorUrl}
                                    >
                                        <FontAwesome.FaWhatsapp />
                                    </WhatsappShareButton>

                                    <TwitterShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={whyMentorUrl}
                                    >
                                        <FontAwesome.FaTwitter />
                                    </TwitterShareButton>

                                    <TumblrShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={whyMentorUrl}
                                    >
                                        <FontAwesome.FaTumblr />
                                    </TumblrShareButton>

                                    <GooglePlusShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={whyMentorUrl}
                                    >
                                        <FontAwesome.FaGooglePlus />
                                    </GooglePlusShareButton>

                                    <a href={mailContent} className={cx(s.spaceIcon, s.blockInline)}>
                                        <FontAwesome.FaEnvelope />
                                    </a>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>

        );
    }
}

export default withStyles(s)(SocialIcon);
