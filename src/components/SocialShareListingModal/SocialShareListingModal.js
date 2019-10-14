// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialShareListingModal.css';
import {
    Button,
    Form,
    FormGroup,
    Col,
    FormControl,
    Checkbox,
    Modal,
    Row
} from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    FacebookShareButton,
    FacebookIcon,
} from 'react-share';
import { closeSocialShareModal } from '../../actions/modalActions';
import { url } from '../../config';
// Translation
import { FormattedMessage } from 'react-intl';
// Locale
import messages from '../../locale/messages';
import SocialShare from '../ViewListing/SocialShare';

class SocialShareListingModal extends Component {
    static propTypes = {
        socialShareModal: PropTypes.bool,
        closeSocialShareModal: PropTypes.func,
        formatMessage: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            SocialShareStatus: false,
        };
    }

    componentDidMount() {
        const { socialShareModal } = this.props;
        if (socialShareModal === true && socialShareModal) {
            this.setState({ SocialShareStatus: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { socialShareModal } = nextProps;

        if (socialShareModal === true) {
            this.setState({ SocialShareStatus: true });
        } else {
            this.setState({ SocialShareStatus: false });
        }
    }

    render() {
        const { closeSocialShareModal, listId, error } = this.props;
        const { SocialShareStatus } = this.state;
        let previewLinkURL = `${url}/experience/${listId}/preview`;

        return (
            <div>
                <Modal
                    show={SocialShareStatus}
                    animation={false}
                    onHide={closeSocialShareModal}
                    dialogClassName={cx(s.logInModalContainer, 'loginModal')}
                >
                    <Modal.Header closeButton className={s.panelHeader}>
                        <Modal.Title>
                            <span>Social Share</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsClass={s.logInModalBody}>
                        <div className={cx(s.space)}>
                           <p> <FormattedMessage {...messages.linkForExperience} /></p>

                            <div className={cx(s.tableCell, s.inputSection)}>
                                <Row>
                                    <Col lg={10} className={s.noPaddingRight}>
                                        <FormGroup className={s.formGroup}>
                                            <FormControl
                                                name="url"
                                                type="text"
                                                value={previewLinkURL}
                                                className={s.formControlInput}
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2} className={cx(s.noPaddingLeft, s.clipBoard)}>
                                        <CopyToClipboard text={previewLinkURL}>
                                            <Button >Copy</Button>
                                        </CopyToClipboard>
                                    </Col>
                                </Row>


                            </div>
                            <div className={cx(s.space4)}>
                                <p><FormattedMessage {...messages.shareIcons} /></p>
                            </div>

                            <div className={cx(s.textCenter, s.bookItPanel)}>
                                <FacebookShareButton
                                    url={previewLinkURL}
                                    className={s.displayIcon}>
                                    <FacebookIcon
                                        size={34}
                                        // round 
                                        />
                                </FacebookShareButton>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


const mapState = state => ({
    socialShareModal: state.modalStatus.isSocialShareModalOpen,
});

const mapDispatch = {
    closeSocialShareModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialShareListingModal));
