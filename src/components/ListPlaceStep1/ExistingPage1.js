/* eslint-disable eqeqeq, no-shadow, no-script-url, css-modules/no-undef-class, react/jsx-no-target-blank */
// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Style
import {
    Button,
    Grid,
    Row,
    Col,
    FormGroup
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ExistingPage.css';

// Component
import ListPlaceTips from '../ListPlaceTips';
import Loader from '../Loader';
import Link from '../Link';
import { toastr } from 'react-redux-toastr';
import history from '../../core/history';
import moment from 'moment';
// Redux action
import { ManagePublishStatus } from '../../actions/Listing/ManagePublishStatus';
import SocialShareListingModal from '../SocialShareListingModal';
import { openSocialShareModal } from '../../actions/modalActions';

class ExistingPage1 extends Component {

    static propTypes = {
        listingSteps: PropTypes.shape({
            step1: PropTypes.string.isRequired,
            step2: PropTypes.string.isRequired,
            step3: PropTypes.string.isRequired,
            listing: PropTypes.shape({
                id: PropTypes.number.isRequired,
                isReady: PropTypes.bool.isRequired,
                isPublished: PropTypes.bool.isRequired,
                user: PropTypes.shape({
                    profile: PropTypes.shape({
                        picture: PropTypes.string.isRequired
                    }),
                }),
            }),
            learningAimCount: PropTypes.number.isRequired
        }),
        nextPage: PropTypes.func.isRequired,
        stepsLoading: PropTypes.bool,
        ManagePublishStatus: PropTypes.func.isRequired,
    };

    static defaultProps = {
        listingSteps: {
            step1: "inactive",
            step2: "inactive",
            step3: "inactive",
            listing: {
                id: 0,
                isReady: false,
                isPublished: false,
                isDeleted: false,
                user:
                {
                    profile:
                    {
                        picture: null
                    }
                }
            },
            learningAimCount: 0,
        },
        photosCount: 0,
        stepsLoading: false
    };

    constructor(props) {
        super(props);
        this.state = {
            showToaster: false,
        };
        this.handleError = this.handleError.bind(this);
        this.handleNavigate = this.handleNavigate.bind(this);
    }

    handleError() {
        this.setState({ showToaster: true });
    }

    handleNavigate() {
        history.push('/user/payout');
    }

    render() {
        const { nextPage, listingSteps, photosCount, stepsLoading, openSocialShareModal } = this.props;
        if (stepsLoading) {
            return <Loader type={"text"} />;
        }
        const { listingSteps: { listing: { id, isReady, isPublished, isDeleted } } } = this.props;
        const { listingSteps: { step1, step2, step3 } } = this.props;
        const { listingSteps: { learningAimCount } } = this.props;
        const { listingSteps: { listing: { user } } } = this.props;
        const { userData, payout } = this.props;
        const { ManagePublishStatus } = this.props;
        const { showToaster } = this.state;
        let isPhotoAvailable = false;
        let isPayout = false;
        if (photosCount > 0) {
            isPhotoAvailable = true;
        }
        let profilePhoto = false;
        if (listingSteps && listingSteps.listing) {
            if (listingSteps.listing.user.profile.picture) {
                profilePhoto = true;
            }
        }

        let isAdmin = false,
            userId,
            defaultPayout;
        if (userData) {
            isAdmin = false;
            if (userData.payout) {
                isPayout = !!userData.payout.userId;
            }
        } else {
            isAdmin = true;
        }
        payout && payout.length > 0 && payout.map((item, index) => {
            userId = item.userId,
            defaultPayout = item.default;
        });
        if (defaultPayout == true) {
            isPayout = !!userId;
        }
        const publishDate = moment(moment(new Date())).format('DD-MM-YYYY');
        return (
            <div className={s.spaceTop5}>
                <Grid>
                    { isDeleted === false &&
                    <Row className={s.landingContainer}>
                        <Col xs={12} sm={7} md={7} lg={7}>
                            {step1 == "completed" && step2 == "active" && step3 == "inactive" && <Col xs={12} sm={12} md={12} lg={12}>
                                <h3 className={s.landingTitle}><FormattedMessage {...messages.step1HeadingLine} /></h3>
                                <p className={s.step1Label}><FormattedMessage {...messages.step1HeadingLineLabel} /></p>
                            </Col>}
                            {step1 == "completed" && step2 == "completed" && step3 == "active" && <Col xs={12} sm={12} md={12} lg={12}>
                                <h3 className={s.landingTitle}><FormattedMessage {...messages.step2HeadingLine} /></h3>
                                <p className={s.step1Label}><FormattedMessage {...messages.step2HeadingLineLabel} /></p>
                            </Col>}

                            {step1 == "completed" && step2 == "completed" && step3 == "completed" && <Col xs={12} sm={12} md={12} lg={12}>
                                <h3 className={s.landingTitle}><FormattedMessage {...messages.step3HeadingLine} /></h3>
                                <p className={s.step1Label}><FormattedMessage {...messages.step3HeadingLineLabel} /></p>
                            </Col>}
                            <Col xs={10} sm={10} md={10} lg={10} >
                                <p className={cx(s.landingTitleStep)}><span><FormattedMessage {...messages.step1HeadingContent} /></span></p>
                                {
                                    step1 == "active" && <Button className={cx(s.button, s.btnPrimary)} onClick={() => nextPage('learning-aims')}>
                                        <FormattedMessage {...messages.continue} />
                                    </Button>
                                }

                                {
                                    step1 == "completed" && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('make-description')}>
                                        <FormattedMessage {...messages.change} />
                                    </a>
                                }
                            </Col>

                            {
                                step1 == "completed" && <Col xs={2} sm={2} md={2} lg={2} >
                                    <span className={s.icon} ><FontAwesome.FaCheckCircle /></span>
                                </Col>
                            }

                            <Col xs={12} sm={12} md={12} lg={12}>
                                <hr className={s.horizontalLineThrough} />
                            </Col>

                            {step2 != "completed" && <Col xs={12} sm={12} md={12} lg={12}>
                                <strong className={s.step}><span className={s.subTitleColor}><FormattedMessage {...messages.step2Heading} /></span></strong>
                                <h3 className={cx(s.landingContentTitle, s.subHeadTextMargin)}><FormattedMessage {...messages.step2SubHeading} /></h3>
                            </Col>}

                            {step2 == "completed" && <Col xs={12} sm={12} md={12} lg={12}>
                                <strong className={s.step}><span><FormattedMessage {...messages.step2Heading} /></span></strong>
                                <h3 className={cx(s.landingContentTitle)}><FormattedMessage {...messages.step2SubHeading} /></h3>
                            </Col>}

                            <Col xs={10} sm={10} md={10} lg={10} >
                                <p className={cx(s.landingTitleStep)}><span><FormattedMessage {...messages.step2HeadingContent} /></span></p>
                                {
                                    step2 == "active" && <Button className={cx(s.button, s.btnPrimary)} onClick={() => nextPage('location')}>
                                        <FormattedMessage {...messages.continue} />
                                    </Button>
                                }

                                {
                                    step2 == "completed" && !isPhotoAvailable && <Button className={cx(s.button, s.btnPrimary)} onClick={() => nextPage('location')}>
                                        <FormattedMessage {...messages.continue} />
                                    </Button>
                                }

                                {/* {
                  step2=="completed" && isPhotoAvailable && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('photos')}>
                    <FormattedMessage {...messages.change} />
                  </a>
                } */}

                                {
                                    step2 == "completed" && isPhotoAvailable && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('location')}>
                                        <FormattedMessage {...messages.change} />
                                    </a>
                                }
                            </Col>

                            {
                                step2 == "completed" && <Col xs={2} sm={2} md={2} lg={2} >
                                    <span className={s.icon} ><FontAwesome.FaCheckCircle /></span>
                                </Col>
                            }

                            <Col xs={12} sm={12} md={12} lg={12}>
                                <hr className={s.horizontalLineThrough} />
                            </Col>

                            {step3 != "completed" && <Col xs={12} sm={12} md={12} lg={12}>
                                <strong className={s.step}><span className={s.subTitleColor}><FormattedMessage {...messages.step3Heading} /></span></strong>
                                <h3 className={cx(s.landingContentTitle, s.subHeadTextMargin)}><FormattedMessage {...messages.step3SubHeading} /></h3>
                            </Col>}


                            {step3 == "completed" && <Col xs={12} sm={12} md={12} lg={12}>
                                <strong className={s.step}><span><FormattedMessage {...messages.step3Heading} /></span></strong>
                                <h3 className={cx(s.landingContentTitle)}><FormattedMessage {...messages.step3SubHeading} /></h3>
                            </Col>}

                            <Col xs={10} sm={10} md={10} lg={10} >
                                <p className={cx(s.landingTitleStep)}><span><FormattedMessage {...messages.step3HeadingContent} /></span></p>
                                {
                                    step3 == "active" && <Button className={cx(s.button, s.btnPrimary)} onClick={() => nextPage('session')}>
                                        <FormattedMessage {...messages.continue} />
                                    </Button>
                                }

                                {
                                    step3 == "completed" && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('session')}>
                                        <FormattedMessage {...messages.change} />
                                    </a>
                                }
                            </Col>

                            {
                                step3 == "completed" && <Col xs={2} sm={2} md={2} lg={2} >
                                    <span className={s.icon} ><FontAwesome.FaCheckCircle /></span>
                                </Col>
                            }

                            <Col xs={12} sm={12} md={12} lg={12}>
                                <hr className={s.horizontalLineThrough} />
                            </Col>
                            <SocialShareListingModal listId={id}/>

                            {
                                listingSteps && isReady && !isPublished && isPayout && <Col xs={12} sm={12} md={12} lg={12} >

                                    <h3 className={s.spaceTop1}>
                                        <FormattedMessage {...messages.readyToPublish} />
                                    </h3>
                                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                                        <Button className={cx(s.button, s.btnPrimary)} onClick={() => ManagePublishStatus(id, 'publish', learningAimCount, profilePhoto, publishDate)}>
                                            <FormattedMessage {...messages.publishNow} />
                                        </Button>
                                        <a target="_blank" href={`/experience/${id}/preview`} className={cx(s.previewLink)} style={{ color: '#00B0CD !important' }}>
                                            <FormattedMessage {...messages.previewListing} />
                                        </a>
                                    </Col>
                                </Col>
                            }
                            {
                                listingSteps && isReady && !isPublished && !isPayout && <Col xs={12} sm={12} md={12} lg={12} >

                                    <h3 className={s.spaceTop1}>
                                        <FormattedMessage {...messages.readyToPublish} />
                                    </h3>
                                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                                        <Button className={cx(s.button, s.btnPrimary)} onClick={() => this.handleError()}>
                                            <FormattedMessage {...messages.publishNow} />
                                        </Button>
                                        <a target="_blank" href={`/experience/${id}/preview`} className={cx(s.previewLink)} style={{ color: '#00B0CD !important' }}>
                                            <FormattedMessage {...messages.previewListing} />
                                        </a>
                                    </Col>
                                </Col>
                            }

                            {
                                !isPayout && showToaster && toastr.error('Please add payout details before you publish')
                            }

                            {
                                listingSteps && isReady && !isPublished && !isPayout && <Col xs={12} sm={12} md={12} lg={12} >
                                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                                        <Button className={cx(s.button, s.btnPrimary)} onClick={() => this.handleNavigate()}>
                                            Add Payout Account
                                        </Button>
                                    </Col>
                                </Col>
                            }
                            {
                                listingSteps && isReady && isPublished && !isPayout && <Col xs={12} sm={12} md={12} lg={12} >
                                    <h3 className={s.spaceTop1}>
                                        <FormattedMessage {...messages.listingPublished} />
                                    </h3>
                                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                                        <Button
                                          className={cx(s.button, s.btnPrimary)}
                                          onClick={() => ManagePublishStatus(id, 'unPublish', learningAimCount, profilePhoto)}
                                        >
                                            <FormattedMessage {...messages.unPublishNow} />
                                        </Button>
                                        <a target="_blank" href={`/experience/${id}/preview`} className={cx(s.previewLink)}><FormattedMessage {...messages.previewListing} /> </a>
                                    </Col>
                                </Col>
                            }

                            {
                                listingSteps && isReady && isPublished && !isPayout && <Col xs={12} sm={12} md={12} lg={12} >
                                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                                        <Button className={cx(s.button, s.btnPrimary)} onClick={() => this.handleNavigate()}>
                                            <FormattedMessage {...messages.addPayout} />
                                        </Button>
                                    </Col>
                                </Col>
                            }
                            {
                                listingSteps && isReady && isPublished && isPayout && <Col xs={12} sm={12} md={12} lg={12} >
                                    <h3 className={s.spaceTop1}>
                                        <FormattedMessage {...messages.listingPublished} />
                                    </h3>
                                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3, s.noPadding)}>
                                        <Button
                                          className={cx(s.button, s.btnPrimary)}
                                          onClick={() => ManagePublishStatus(id, 'unPublish', learningAimCount, profilePhoto)}
                                        >
                                            <FormattedMessage {...messages.unPublishNow} />
                                        </Button>
                                        <a target="_blank" href={`/experience/${id}/preview`} className={cx(s.previewLink)}><FormattedMessage {...messages.previewListing} /> </a>
                                    </Col>
                                </Col>
                            }

                        </Col>
                        {/* <ListPlaceTips /> */}

                    </Row>
                    }
                </Grid>
            </div>
        );

    }
}

const mapState = state => ({
    listingSteps: state.location.listingSteps,
    stepsLoading: state.location.stepsLoading,
    userData: state.account.data,
    payout: state.payout.payoutDetails
});

const mapDispatch = {
    ManagePublishStatus,
    openSocialShareModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ExistingPage1)));
