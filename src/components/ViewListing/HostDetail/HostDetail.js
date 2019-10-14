import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// External Component
import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HostDetail.css';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import Avatar from '../../Avatar';
import ContactHost from '../ContactHost';
import Link from '../../Link';

// Redux Action
import {contactHostOpen} from '../../../actions/message/contactHostModal';


class HostDetail extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
        personCapacity: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            profileId: PropTypes.number.isRequired,
            displayName: PropTypes.string.isRequired,
            picture: PropTypes.string,
            location: PropTypes.string,
            createdAt: PropTypes.string.isRequired,
            info: PropTypes.string,
            homeTown: PropTypes.string
        }).isRequired,
        listingData: PropTypes.shape({
            minNight: PropTypes.number,
            maxNight: PropTypes.number,
            maxDaysNotice: PropTypes.string,
        }).isRequired,
        blockedDates: PropTypes.array,
        contactHostOpen: PropTypes.func.isRequired,
        isHost: PropTypes.bool.isRequired,
        formatMessage: PropTypes.func,
    };

    static defaultProps = {
        id: 0,
        userId: null,
        personCapacity: 0,
        city: null,
        profile: {
            profileId: 0,
            displayName: null,
            picture: null,
            location: null,
            createdAt: null,
            info: null,
            homeTown: null

        },
        listingData: {
            minNight: 0,
            maxNight: 0
        },
        blockedDates: [],
        showContactHostModal: false,
        isHost: false,
        listTitle: null,
    }

    render() {
        const { contactHostOpen, isHost, hostEmail } = this.props;
        const { id, personCapacity, userId, city, blockedDates } = this.props;
        const { profile: { profileId, displayName, firstName, lastName, picture, location, info, createdAt, homeTown } } = this.props;
        const { listingData: { minNight, maxNight, maxDaysNotice } } = this.props;
        const joinedDate = createdAt != null ? moment(createdAt).format("MMMM YYYY") : '';
        const { listTitle } = this.props;
        const initialValues = {
            listId: id,
            host: userId,
            hostEmail,
            firstName,
            listTitle
        };
        return (
            <div>
                <ContactHost
                  initialValues={initialValues}
                  id={id}
                  userId={userId}
                  city={city}
                  profileId={profileId}
                  picture={picture}
                  displayName={firstName}
                  personCapacity={personCapacity}
                  blockedDates={blockedDates}
                  minNight={minNight}
                  maxNight={maxNight}
                  maxDaysNotice={maxDaysNotice}
                />
                <Row className={cx(s.pageContent)}>
                    <Col xs={12} sm={12} md={8} lg={8} className={cx(s.padding3, s.paddingTop3, s.horizontalLineThrough)}>
                        <h1 className={cx(s.sectionTitleText, s.space2)}><FormattedMessage {...messages.yourMentor} /></h1>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space3, s.spaceTop3)}>
                        <Row>
                            <Col xs={12} sm={3} md={3} lg={3} >
                                <div className={s.profileAvatarSection}>
                                    <Avatar
                                      source={picture}
                                      height={115}
                                      width={115}
                                      title={firstName}
                                      className={s.profileAvatar}
                                      withLink
                                      linkClassName={s.profileAvatarLink}
                                      profileId={profileId}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} sm={9} md={9} lg={9}>
                                <Link to={`/users/show/${profileId}`}>
                                    <h1 className={cx(s.titleText, s.space1)}>
                                        {`${firstName} ${lastName}`}
                                    </h1>
                                </Link>
                                <p className={s.textMuted}>
                                    {homeTown}
                                </p>
                                <p><span className={cx(s.text)}>{info}</span></p>
                                {
                  !isHost && <Button className={cx(s.btn, s.btnlarge, s.btnPrimary)} onClick={() => contactHostOpen(id)} style={{ margin: '10px 0 40px' }}>
                      <FormattedMessage {...messages.contactMentor} />
                  </Button>
                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapState = state => ({});

const mapDispatch = {
    contactHostOpen
};

export default withStyles(s)(connect(mapState, mapDispatch)(HostDetail)
);
