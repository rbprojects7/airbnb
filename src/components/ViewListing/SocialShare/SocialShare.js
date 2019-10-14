import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ProgressBar } from 'react-bootstrap';
// import { ShareButtons, generateShareIcon} from 'react-share';
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
  } from 'react-share';
  
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SocialShare.css';

import {url} from '../../../config';

class SocialSharing extends React.Component {

    static propTypes = {
        listId: PropTypes.number.isRequired
    };
    
    render() {
        const {listId} = this.props;
        const shareUrl = url + '/experience/' + listId;
        return (
            <div className={cx(s.textCenter, s.bookItPanel)}>
                <FacebookShareButton
                    url={shareUrl}
                    className={s.displayIcon}>
                    <FacebookIcon
                        size={34}
                        round />
                </FacebookShareButton>
                <TwitterShareButton
                    url={shareUrl}
                    className={s.displayIcon}>
                    <TwitterIcon
                        size={34}
                        round />
                </TwitterShareButton>
                <GooglePlusShareButton
                    url={shareUrl}
                    className={s.displayIcon}>
                    <GooglePlusIcon
                        size={34}
                        round />
                </GooglePlusShareButton>
                <LinkedinShareButton
                    url={shareUrl}
                    className={s.displayIcon}>
                    <LinkedinIcon
                        size={34}
                        round />
                </LinkedinShareButton>
                <WhatsappShareButton
                    url={shareUrl}
                    className={s.displayIcon}>
                    <WhatsappIcon
                        size={34}
                        round />
                </WhatsappShareButton>
                <TumblrShareButton
                    url={shareUrl}
                    className={s.displayIcon}>
                    <TumblrIcon
                        size={34}
                        round />
                </TumblrShareButton>
            </div>
        )
    }
}


export default withStyles(s)(SocialSharing);
