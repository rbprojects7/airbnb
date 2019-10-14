import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { toastr } from 'react-redux-toastr';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListItem.css';

// Redux action
import { ManagePublishStatus } from '../../../actions/Listing/ManagePublishStatus';
import moment from 'moment';
// Locale
import messages from '../../../locale/messages';
// import SocialShareListingModal from '../../SocialShareListingModal';
// import { openSocialShareModal } from '../../../actions/modalActions';

class PublishOption extends Component {
    static propTypes = {
        listId: PropTypes.number.isRequired,
        isPublished: PropTypes.bool.isRequired,
        ManagePublishStatus: PropTypes.func.isRequired,
        formatMessage: PropTypes.func,
    };

    static defaultProps = {
        isPublished: false
    };

    constructor(props) {
        super(props);
        this.state = {
            showToaster: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleError() {
        this.setState({ showToaster: true });
    }

    handleChange(event) {
        const { listId, ManagePublishStatus, learningAimCount, profilePhoto } = this.props;
        const action = event.target.value;
        ManagePublishStatus(listId, action, learningAimCount, profilePhoto);
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { isPublished, listId } = this.props;
        const { learningAimCount, profilePhoto, userData } = this.props;
        let isPayout = false;
        const { showToaster } = this.state;
        if (userData) {
            if (userData.payout) {
                isPayout = !!userData.payout.userId;
            }
        }

        let defaultValue = 'unPublish';
        if (isPublished) {
            defaultValue = 'publish';
        }
        return (
            
            <span>
                 
                {
                    isPayout && <select className={s.formSelect} value={defaultValue} onChange={this.handleChange} style={{ maxWidth: '100%' }}>
                        <option value="publish">{formatMessage(messages.listed)}</option>
                        <option value="unPublish">{formatMessage(messages.unListed)}</option>
                    </select>
                }
                {
                    !isPayout && <select className={s.formSelect} value={defaultValue} onChange={this.handleError}>
                        <option value="publish">{formatMessage(messages.listed)}</option>
                        <option value="unPublish">{formatMessage(messages.unListed)}</option>
                    </select>
                }
                {
                    !isPayout && showToaster && toastr.error('Please add payout details before you publish')
                }
                 {/* <SocialShareListingModal listId={listId}/> */}
            </span>
        );
    }
}

const mapState = state => ({
    userData: state.account.data
});

const mapDispatch = {
    ManagePublishStatus,
    // openSocialShareModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PublishOption)));
