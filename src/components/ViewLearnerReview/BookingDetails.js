import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BookingDetails.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

// Component
import Avatar from '../Avatar';
import ListCoverPhoto from '../ListCoverPhoto';
import Loader from '../Loader';

// Helper
import { convert } from '../../helpers/currencyConvertion';

// Locale
import messages from '../../locale/messages';

class BookingDetails extends Component {

  static propTypes = {

  };
  static defaultProps = {
    listingData: null,
    loading: true
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { listingData, loading } = this.props;    
    const { blockSessionData } = this.props;
    
    let hostPicture, hostDisplayName;
    if (loading) {
      return (
        <Col md={5} mdPush={7}>
          <Loader type={"text"} />
        </Col>
      )
    }

    if (!loading && listingData && listingData != null) {
      hostDisplayName = listingData.user && listingData.user.profile ? listingData.user.profile.firstName : null;
      hostPicture = listingData.user && listingData.user.profile ? listingData.user.profile.picture : null;

      return (
        <Col md={5} mdPush={7}>
          <div className={cx(s.summaryCard, s.colCenter)}>
            <ListCoverPhoto
              className={cx(s.bannerImage, s.backgroundCover)}
              coverPhoto={listingData.coverPhoto}
              listPhotos={listingData.listPhotos}
              photoType={"x_medium"}
              bgImage
            />
            <div className={cx(s.hostProfilePhoto, s.pullRight, s.space3)}>
              <div className={cx(s.profileAvatarLink, s.profileAvatarSection)}>
                <Avatar
                  source={hostPicture}
                  title={hostDisplayName}
                  className={s.profileAvatar}
                />
              </div>
            </div>
            <Panel className={s.panelHeader}>
              <div className={cx(s.textMuted, s.space2)}>
                <span><FormattedMessage {...messages.hostedBy} /> {hostDisplayName}</span>
              </div>
              <div className={cx(s.textLarge, s.space1)}>
                <span>{listingData.title}</span>
              </div>
              <div className={cx(s.textMuted)}>
                <div> {listingData.city}, {listingData.state}, {listingData.country} </div>
              </div>
              <div className={s.spaceTop2}>
                <hr className={s.horizondalLine} />
                {
                  blockSessionData && blockSessionData.length > 0 && blockSessionData.map((item, key) => {
                    return (
                      <Row key={key}>
                        <Col sm={8} md={8} lg={8}>
                          <p >{item.date}</p>
                        </Col>
                        <Col sm={2} md={2} lg={2}>
                          <p>{item.startTime}</p>
                        </Col>
                        <Col sm={2} md={2} lg={2}>
                          <p>{item.endTime}</p>
                        </Col>
                      </Row>
                    )
                  })
                }
              </div>
            </Panel>
          </div>
          <div className={cx(s.ratingDetailsSection)}>
            <h3 className={cx(s.textLarge, s.space3, s.textColor)}>Our progress scale: </h3>
            <p className={cx(s.textMuted, s.space3, s.instructionText)}><span className={s.textColor}>Understand:</span> I describe and recall. </p>
            <p className={cx(s.textMuted, s.space3, s.instructionText)}><span className={s.textColor}>Apply:</span> I link my learning with other ideas, compare them and understand why they are important. </p>
            <p className={cx(s.textMuted, s.space3, s.instructionText)}><span className={s.textColor}>Extend:</span> I can apply this to new situations, create new ideas and predict what will happen.</p>
          </div>
        </Col>
      );
    }

    if (!loading && listingData == null) {
      return (
        <Col md={5} mdPush={7}>
          <div className={cx(s.ratingDetailsSection)}>
            <h3 className={cx(s.textLarge, s.textColor, s.space3)}>Experience has unpublished!</h3>
          </div>
        </Col>
      );
    }
  }
}

const selector = formValueSelector('MentorReviewsForm'); // <-- same as form name

const mapState = (state) => ({
  account: state.account.data
});

const mapDispatch = {

};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(BookingDetails)));

// export default withStyles(s)(Payment);
