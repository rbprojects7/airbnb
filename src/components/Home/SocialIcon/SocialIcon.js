import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialIcon.css';
import { url } from '../../../config';

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
        // const mailContent = `${"mailto" + ":"}${whyMentorUrl}?subject=TutorHere&body=Hi,I found this website and thought you might like it`;
        const mailContent = `${"mailto" + ":"}?subject=TutorHere&body=A peer to peer platform that provides a revolutionary alternative to school. Find inspiring mentors and learning experiences in your area. Keep a lifetime of records in one place. ${url}`;
        return (
            <div id="TutorHere_social_icons">

                <Grid fluid>
                    <Row>
                        <Col md={12} lg={12} xs={12} sm={12}>
                            <div className={cx(s.container, s.titleCenter)}>
                                <h3 className={cx(s.titleText, s.blockInlineTitle)}>Spread the word</h3>
                                <div className={cx(s.spaceTop, s.blockInlineTitle)}>
                                    <FacebookShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={url}
                                    >
                                        <FontAwesome.FaFacebook />
                                    </FacebookShareButton>

                                    <WhatsappShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={url}
                                    >
                                        <FontAwesome.FaWhatsapp />
                                    </WhatsappShareButton>

                                    <TwitterShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={url}
                                    >
                                        <FontAwesome.FaTwitter />
                                    </TwitterShareButton>

                                    <TumblrShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={url}
                                    >
                                        <FontAwesome.FaTumblr />
                                    </TumblrShareButton>

                                    <GooglePlusShareButton
                                      className={cx(s.spaceIcon, s.blockInline)}
                                      url={url}
                                    >
                                        <FontAwesome.FaGooglePlus />
                                    </GooglePlusShareButton>

                                    {/* { <MailruShareButton className={cx(s.spaceIcon, s.blockInline)}
                                        url={url}>
                                        <FontAwesome.FaEnvelope />
                                    </MailruShareButton> } */}

                                    { <a href={mailContent} className={cx(s.spaceIcon, s.blockInline)}>
                                        <FontAwesome.FaEnvelope />
                                    </a> }


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
