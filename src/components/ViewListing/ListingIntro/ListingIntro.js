import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {contactHostOpen} from '../../../actions/message/contactHostModal';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingIntro.css';
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

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Component
import Avatar from '../../Avatar';
import StarRating from '../../StarRating';
import Link from '../../Link';

class ListingIntro extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        formatMessage: PropTypes.func,
        reviewsCount: PropTypes.number.isRequired,
        reviewsStarRating: PropTypes.number.isRequired,
    };

    render() {
        const { data, contactHostOpen } = this.props;
        const { formatMessage } = this.props.intl;
        const { reviewsCount, reviewsStarRating } = this.props;
        let starRatingValue = 0;
        if (reviewsCount > 0 && reviewsStarRating > 0) {
            starRatingValue = Number(reviewsStarRating / reviewsCount);
        }
        return (
            <Row>
                <Col xs={12} sm={3} md={3} lg={3}>
                    <div className={s.profileAvatarSection}>
                        <Avatar
                          source={data.user.profile.picture}
                          type={"small"}
                          height={115}
                          width={115}
                          title={data.user.profile.firstName}
                          className={s.profileAvatar}
                          withLink
                          linkClassName={s.profileAvatarLink}
                          profileId={data.user.profile.profileId}
                        />
                    </div>
                    <p className={cx('text-center', s.spaceTop4)}>
                        <Link to={`/users/show/${data.user.profile.profileId}`}>
                            <span className={cx(s.textMuted)}>
                                {data.user.profile.firstName}
                            </span>
                        </Link>
                    </p>
                </Col>
                <Col xs={12} sm={9} md={9} lg={9} className={s.introCenter}>
                    <h1 className={cx(s.titleText, s.space1)}>
                        {data.title != null ? data.title : `${data.settingsData[0].listsettings.itemName} ${formatMessage(messages.in)} ${data.city}`}
                    </h1>
                    <div className={cx(s.space1)}>
                        <a className={s.textMuted}>{data.city}, {data.state}, {data.country}</a>
                    </div>
                    <div className={cx(s.space4)}>
                        <span><StarRating name={'review'} value={starRatingValue} /></span>
                    </div>
                    <Button className={cx(s.btn, s.btnlarge, s.btnPrimary)} onClick={() => contactHostOpen(data.id)} style={{ margin: '0 0 40px' }}>
                        Contact Mentor
                    </Button>
                </Col>
            </Row>
        );
    }
}

const mapState = state => ({});

const mapDispatch = {
    contactHostOpen
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListingIntro)));
