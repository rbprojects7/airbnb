import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';
import {formValueSelector, initialize, submit} from 'redux-form';

import {
  Row, 
  Col,
  Panel,
  FormGroup,
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';
import logoUrl from './logo-small.jpg';

// Components
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';
import ListCoverPhoto from '../ListCoverPhoto';
import PaymentDetails from '../Booking/Payment/PaymentDetails';

// Locale
import messages from '../../locale/messages';

class DetailsForGuest extends React.Component {

  static propTypes = { 
    formatMessage: PropTypes.func,
    reservationId: PropTypes.number.isRequired,
    confirmationCode: PropTypes.number.isRequired,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    hostEmail: PropTypes.string.isRequired,
    guestName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number.isRequired,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    cancelData: PropTypes.shape({
      policyName: PropTypes.string.isRequired,
      accomodation: PropTypes.number.isRequired,
      guestFees: PropTypes.number.isRequired,
      remainingNights: PropTypes.number,
      interval: PropTypes.number.isRequired,
      nights: PropTypes.number.isRequired,
    }).isRequired,
    message: PropTypes.string,
    initialize: PropTypes.func, 
    submit: PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async handleCancel(cancellationData){
    const { initialize, submit} = this.props;
    await initialize('CancellationForm', cancellationData, true);
    await submit('CancellationForm');
  }

  render() {
    const {reservationId, userType, firstName, hostEmail, checkIn, checkOut, guests, title, listId, picture, profileId, guestName} = this.props;
    const {basePrice, cleaningPrice, guestServiceFee, hostServiceFee, total, currency, threadId, hostId, confirmationCode} = this.props;
    const {cancelData: {policyName, accomodation, guestFees, remainingNights, interval, nights}} = this.props;
    const { cancellation } = this.props;
    const {message} = this.props;
    const { coverPhoto, listPhotos, city, state, country, sessionTimes, experienceType, cancellationDescription, cancellationPolicy } = this.props;
    let isDisabled = true, cancellationData = {};
    let checkInDate = checkIn != null ? moment(checkIn).format('Do MMM') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('Do MMM') : '';

    let refundableNightPrice = 0, nonRefundableNightPrice = 0, refundWithoutGuestFee = 0;
    let updatedGuestFee = 0, updatedHostFee = 0, payoutToHost = 0, subtotal = 0;

    

    if(remainingNights >= 0){
      if(remainingNights === nights){
        refundableNightPrice = ((basePrice * nights) * (accomodation/100)) + cleaningPrice + (guestServiceFee * (guestFees/100));
        refundWithoutGuestFee = ((basePrice * nights) * (accomodation/100)) + cleaningPrice;
        if(refundWithoutGuestFee !== total){
          nonRefundableNightPrice = (total + guestServiceFee) - refundableNightPrice;
          if(refundWithoutGuestFee === cleaningPrice) {
            payoutToHost = total - refundWithoutGuestFee - hostServiceFee;
          } else {
            payoutToHost = refundWithoutGuestFee - cleaningPrice - hostServiceFee;
          }
          updatedHostFee = hostServiceFee;
        }
      } else {
        refundableNightPrice = (remainingNights * basePrice) * (accomodation/100);
        refundWithoutGuestFee = total - refundableNightPrice;
        nonRefundableNightPrice = (total + guestServiceFee) - refundableNightPrice;
        updatedGuestFee = guestServiceFee;
        payoutToHost = refundWithoutGuestFee - hostServiceFee;
        updatedHostFee = hostServiceFee;
      }
    } else {
      refundableNightPrice = ((basePrice * nights) * (accomodation/100)) + cleaningPrice + (guestServiceFee * (guestFees/100));
      refundWithoutGuestFee = ((basePrice * nights) * (accomodation/100)) + cleaningPrice;
      if(refundWithoutGuestFee != total) {
        nonRefundableNightPrice = total - refundWithoutGuestFee;
        payoutToHost = nonRefundableNightPrice - hostServiceFee;
        updatedHostFee = hostServiceFee;
      }
    } 

    subtotal = total + guestServiceFee; 

    cancellationData = {
      reservationId,
      cancellationPolicy: policyName,
      refundToGuest: refundableNightPrice,
      payoutToHost: payoutToHost,
      guestServiceFee: updatedGuestFee,
      hostServiceFee: updatedHostFee,
      total: subtotal,
      currency,
      threadId,
      cancelledBy: 'guest',
      checkIn, 
      checkOut, 
      guests,
      guestName,
      hostName: firstName,
      listTitle: title,
      confirmationCode,
      hostEmail,
      cancellation,
      cancelledDate:moment(moment(new Date())).format('DD-MM-YYYY'),

    };
    if(message){
      isDisabled = false;
    }
    return (
      <div>
        <Col xs={12} sm={5} md={5} lg={5} className={s.spaceTop5} >
          {/* <Panel className={s.panelHeader}>
            <Row>
              <Col xs={8} sm={8} md={8} lg={8} >
                <div className={s.textTruncate}>
                  <span className={cx(s.textHigh, s.textBold)}>{firstName}</span><br />
                  <Link to={"/experience/" + listId}>{title}</Link>
                </div>
                <br />
                <div>
                 <span>{checkInDate} - {checkOutDate}</span>
                </div>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} className={s.textRight}>
                <div className={s.profileAvatarSection}>
                  <Avatar
                    source={picture}
                    height={65}
                    width={65}
                    title={firstName}
                    className={s.profileAvatar}
                    withLink
                    linkClassName={s.profileAvatarLink}
                    profileId={profileId}
                  />
                </div>
              </Col>
            </Row>
            <hr />
            {
              nonRefundableNightPrice > 0 && <Row>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textLeft}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <FormattedMessage {...messages.nonRefundable} />
                  </span><br />
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textRight}>
                  <span className={cx(s.textHigh, s.textBold, s.textLine)}>
                    <CurrencyConverter
                      amount={nonRefundableNightPrice}
                      from={currency}
                    />
                  </span>
                </Col>
              </Row>
            }
            
            {
              refundableNightPrice > 0 && <Row>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textLeft}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <FormattedMessage {...messages.refundable} />
                  </span><br />
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textRight}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <CurrencyConverter
                      amount={refundableNightPrice}
                      from={currency}
                    />               
                  </span>
                </Col>
              </Row>
            }
            
            <div className={cx(s.space3, s.spaceTop3)}>
             <p className={cx(s.landingStep)}><span><FormattedMessage {...messages.refundCost} /></span></p>
            </div>
          </Panel>  */}

          <div className={cx(s.summaryCard, s.colCenter)}>
            <ListCoverPhoto
              className={cx(s.bannerImage, s.backgroundCover)}
              coverPhoto={coverPhoto}
              listPhotos={listPhotos}
              photoType={"x_medium"}
              bgImage
            />
            <div className={cx(s.hostProfilePhoto, s.pullRight, s.space3)}>
              <div className={cx(s.profileAvatarLink, s.profileAvatarSection)}>
                <Avatar
                  source={picture}
                  title={firstName}
                  className={s.profileAvatar}
                />
              </div>
            </div>
            <Panel className={s.panelHeader}>
              <div className={cx(s.textMuted, s.space2)}>
                <span><FormattedMessage {...messages.hostedBy} /> {firstName}</span>
              </div>
              <div className={cx(s.textLarge, s.space1)}>
                <span>{title}</span>
              </div>
              <div className={cx(s.textMuted)}>
                {/* <ul className={s.listStyle}>
                  <li>
                    {listType}
                  </li>
                </ul> */}
                <div> {city}, {state}, {country} </div>
              </div>
              <div className={s.spaceTop2}>
                <hr className={s.horizondalLine} />
                {/* <Row className={cx(s.spaceTop3, s.space3)}>
                    <Col xs={5} sm={5}>
                      <div className={cx(s.textGray, s.space1)}>
                        <span><FormattedMessage {...messages.checkIn} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkInDate}</div>
                    </Col>
                    <Col xs={1} sm={1}>
                      <FontAwesome.FaChevronRight className={cx(s.textGray, s.chevronIcon)} />
                    </Col>
                    <Col xs={5} sm={5} className={cx(s.pullRight, s.textLeft)}>
                      <div className={cx(s.textGray, s.space1)}>
                        <span><FormattedMessage {...messages.checkOut} /></span>
                      </div>
                      <div className={s.checkInDate}>{checkOutDate}</div>
                    </Col>
                  </Row> */}
                {
                  sessionTimes.map((item, key) => {
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
                <hr className={s.horizondalLine} />
              </div>

              {/* <PaymentDetails
                basePrice={basePrice}
                cleaningPrice={cleaningPrice}
                currency={currency}
                  // dayDifference={dayDifference}
                  // priceForDays={priceForDays}
                discount={discount}
                discountType={discountType}
                serviceFees={guestServiceFee}
                total={total}
                sessionTimes={sessionTimes}
                guests={guests}
              /> */}

              {/* <div>
                  <span><FormattedMessage {...messages.cancellationPolicy} />: </span>
                  <span>{policyName}</span>
                </div> */}
            </Panel>
           
          </div>

        </Col>
        <Col xs={12} sm={12} lg={12} md={12}>
          <hr className={cx(s.horizontalLineThrough, s.spaceTop4)} />
        </Col>
        <FormGroup className={s.formGroup}>
          <Col xs={12} sm={12} md={7} lg={7}>
            <Link 
              className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft, s.btnWidth )}
              to={"/experiences/current"}
            >
              <FormattedMessage {...messages.keepBooking} />
            </Link>
            <Button 
              className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight, s.btnWidth)} 
              onClick={() => this.handleCancel(cancellationData)}
              disabled={isDisabled}
            >
              <FormattedMessage {...messages.cancelYourBooking} />
            </Button>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

const selector = formValueSelector('CancellationForm'); // <-- same as form name

const mapState = (state) => ({
  message: selector(state, 'message'),
});

const mapDispatch = {
  initialize, 
  submit
};

export default withStyles(s)(connect(mapState, mapDispatch)(DetailsForGuest));
