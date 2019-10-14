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
import logoUrl from './logo-small.jpg';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
// Component
import PaymentDetails from './PaymentDetails';
import PaymentForm from './PaymentForm';
import Avatar from '../../Avatar';
import CurrencyConverter from '../../CurrencyConverter';
import ListCoverPhoto from '../../ListCoverPhoto';

// Helper
import { convert } from '../../../helpers/currencyConvertion';

// Locale
import messages from '../../../locale/messages';

class Payment extends Component {

    static propTypes = {
        listId: PropTypes.number.isRequired,
        hostId: PropTypes.string.isRequired,
        guestId: PropTypes.string.isRequired,
        guestEmail: PropTypes.string.isRequired,
        hostDisplayName: PropTypes.string.isRequired,
        hostPicture: PropTypes.string,
        coverPhoto: PropTypes.string,
        listTitle: PropTypes.string.isRequired,
        allowedPersonCapacity: PropTypes.number.isRequired,
        listType: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        houseRules: PropTypes.arrayOf(PropTypes.shape({
            listsettings: PropTypes.shape({
                itemName: PropTypes.string.isRequired
            })
        })),
        checkIn: PropTypes.object.isRequired,
        checkOut: PropTypes.object.isRequired,
        guests: PropTypes.number.isRequired,
        basePrice: PropTypes.number.isRequired,
        cleaningPrice: PropTypes.number,
        currency: PropTypes.string.isRequired,
        weeklyDiscount: PropTypes.number,
        monthlyDiscount: PropTypes.number,
        listPhotos: PropTypes.array,
        serviceFees: PropTypes.shape({
            guest: PropTypes.shape({
                type: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }).isRequired,
            host: PropTypes.shape({
                type: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        base: PropTypes.string.isRequired,
        rates: PropTypes.object.isRequired,
        bookingType: PropTypes.string.isRequired,
        policyName: PropTypes.string.isRequired,
        formatMessage: PropTypes.func,
        emailVerified: PropTypes.bool.isRequired,
        guestPicture: PropTypes.string,
        child: PropTypes.array,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        experienceType: PropTypes.number.isRequired,
        cancellationDescription: PropTypes.string,
        cancellationPolicy: PropTypes.arrayOf(PropTypes.shape({
            policy: PropTypes.shape({
                policyContent: PropTypes.string
            })
        }))
    };
    static defaultProps = {
        parent: false,
        child: []

    }
    constructor(props) {
        super(props);
        this.chosenDates = this.chosenDates.bind(this);
    }

    chosenDates() {
        const { chosenBlock, parent, child } = this.props;
        const sessionTimes = chosenBlock.sessionTime;
        let startDate = null,
            endDate = null,
            count = 0;
        let chosenBlockDates = [],
            chosenBlockDate = {},
            selectedDates = [],
            newDate;
        let chosenTimes = [],
            chosenStartTime,
            chosenEndTime;
        let reservationBlockId,
            reservationBlockUniqueId;
        if (sessionTimes && sessionTimes.length > 0) {
            reservationBlockId = sessionTimes[0].blockId;
            reservationBlockUniqueId = sessionTimes[0].blockUniqueId;
            console.log("reservationBlockUniqueId==", reservationBlockUniqueId);
            sessionTimes.map((item, key) => {
                if (item && item.date && item.startTime && item.endTime) {
                    newDate = moment(item.date, 'Do MMM YYYY').format('YYYY-MM-DD');
                    chosenBlockDate = {
                        date: moment(item.date),
                        startTime: item.startTime,
                        endTime: item.endTime,
                        blockId: item.blockId,
                        blockUniqueId: item.blockUniqueId,
                        newDate
                    };
                    selectedDates.push(moment(newDate));
                    chosenBlockDates.push(chosenBlockDate);
                }
            });

            let firstSessionIndex = [];
            firstSessionIndex = sessionTimes[0];
            chosenStartTime = firstSessionIndex.startTime;

            let lastSessionIndex = [];
            lastSessionIndex = sessionTimes.slice(-1)[0];
            chosenEndTime = lastSessionIndex.endTime;
            chosenTimes.push(chosenStartTime, chosenEndTime);
        }

        if (selectedDates && selectedDates.length > 0) {
            startDate = moment.min(selectedDates);
            endDate = moment.max(selectedDates);
        }
        if (parent == true) {
            count += 1;
        }

        if (child.length > 0) {
            count += child.length;
        }
        return {
            chosenBlockDates,
            startDate,
            endDate,
            count,
            sessionTimes,
            parent,
            child,
            chosenTimes,
            reservationBlockId,
            reservationBlockUniqueId
        };
    }

    render() {
        const { guestDisplayName, guestPicture } = this.props;
        const { guestEmail, hostDisplayName, hostPicture, coverPhoto, listPhotos, bookingType, policyName } = this.props;
        const { listId, listTitle, listType, city, state, country, allowedPersonCapacity } = this.props;
        const { houseRules, hostId, guestId } = this.props;
        const { guests, checkIn, checkOut, chosenBlock, parent, child } = this.props;
        const { basePrice, cleaningPrice, currency, weeklyDiscount, monthlyDiscount } = this.props;
        const { serviceFees, base, rates } = this.props;
        const { experienceType, cancellationDescription, cancellationPolicy } = this.props;
        let guestServiceFee = 0,
            hostServiceFee = 0,
            priceForDays = 0;
        let discount = 0,
            discountType,
            total = 0,
            totalWithoutFees = 0;
        let momentStartDate,
            momentEndDate,
            dayDifference;
        const {
      chosenBlockDates,
      startDate,
      endDate,
      count,
      sessionTimes,
      chosenTimes,
      reservationBlockId,
      reservationBlockUniqueId
    } = this.chosenDates();
        priceForDays = Number(basePrice) * Number(count);
        if (serviceFees) {
            if (serviceFees.guest.type === 'percentage') {
                guestServiceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
            } else {
                guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
            }

            if (serviceFees.host.type === 'percentage') {
                hostServiceFee = priceForDays * (Number(serviceFees.host.value) / 100);
            } else {
                hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
            }

        }

        if (dayDifference >= 7) {
            if (monthlyDiscount > 0 && dayDifference >= 28) {
                discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
                discountType = `${monthlyDiscount}% monthly price discount`;
            } else if (weeklyDiscount > 0) {
                discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
                discountType = `${weeklyDiscount}% weekly price discount`;
            }
        }

        total = (priceForDays + guestServiceFee + cleaningPrice) - discount;

        totalWithoutFees = (priceForDays + cleaningPrice) - discount;

    // let checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM') : '';
    //let checkOutDate = checkOut != null ? moment(checkOut).format('ddd, Do MMM') : '';

        const checkInDate = startDate != null ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : '';
        const checkOutDate = endDate != null ? moment(endDate).format('YYYY-MM-DD HH:mm:ss') : '';


        const checkInStartTime = chosenTimes[0];
        const checkInEndTime = chosenTimes[1];
        const reservationBlockIdValue = reservationBlockId;
        const reservationBlockUniqueIdValue = reservationBlockUniqueId;
        let momentLessHour = 0,
            momentLessMinute = 0,
            h = 0,
            m = 0,
            timeFromMinute,
            totalHours = 0;
        {
            sessionTimes.map((item, index) => {

                const convertedStartTime = moment.utc(item.startTime, "HH:mm");
                const convertedEndTime = moment.utc(item.endTime, "HH:mm");
                if (convertedEndTime.isBefore(convertedStartTime)) convertedEndTime.add(1, 'day');
                const d = moment.duration(convertedEndTime.diff(convertedStartTime));
                const s = moment.utc(+d).format('HH:mm');
                const splittedHour = s.split(':');
                momentLessHour += Number(splittedHour[0]);
                momentLessMinute += Number(splittedHour[1]);

                m = momentLessMinute % 60;
                h = (momentLessMinute - m) / 60;

                timeFromMinute = `${h.toString()}:${m < 10 ? "0" : ""}${m.toString()}`;
                const splittedMinute = timeFromMinute.split(':');
                const hourFromMinute = Number(splittedMinute[0]);
                const minuteFromMinute = Number(splittedMinute[1]);

                const finalHour = momentLessHour + hourFromMinute;
                totalHours = finalHour + (minuteFromMinute > 0 ? `.${minuteFromMinute}` : '');
                console.log('totalhours', totalHours);
            });
        }
        const initialValues = {
            listId,
            listTitle,
            hostId,
            guestId,
            guests,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            basePrice,
            currency,
            cleaningPrice,
            discount,
            discountType,
            guestServiceFee,
            hostServiceFee,
            total: totalWithoutFees,
            bookingType,
            paymentType: '2',
            guestEmail,
            sessionTimes: JSON.stringify(sessionTimes),
            parent,
            child,
            startTime: checkInStartTime,
            endTime: checkInEndTime,
            blockId: reservationBlockIdValue,
            blockUniqueId: reservationBlockUniqueIdValue,
            totalSessionHours: Number(totalHours),
        };
        return (

            <Grid>
                <Row>
                    <Col md={5} mdPush={7}>
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
                                    <span>{listTitle}</span>
                                </div>
                                <div className={cx(s.textMuted)}>
                                    <ul className={s.listStyle}>
                                        <li>
                                            {listType}
                                        </li>
                                    </ul>
                                    <div> {city}, {state}, {country} </div>
                                </div>
                                <div className={s.spaceTop2}>
                                    <hr className={s.horizondalLine} />
                                    {
                    sessionTimes.map((item, key) => (
                        <Row key={key} style={{ fontSize: 14 }}>
                            <Col xs={7} sm={7} md={7} lg={7}>
                                <p className="hidden-md hidden-lg">{moment(item.date, 'Do MMM YYYY').format('ddd D MMM YYYY')}</p>
                                <p className="hidden-xs hidden-sm">{item.date}</p>
                            </Col>
                            <Col xs={5} sm={5} md={5} lg={5}>
                                <p style={{ textAlign: 'right' }}>{item.startTime}-{item.endTime}</p>
                            </Col>
                        </Row>
                      ))
                  }
                                    <hr className={s.horizondalLine} />
                                </div>

                                <PaymentDetails
                                  basePrice={basePrice}
                                  cleaningPrice={cleaningPrice}
                                  currency={currency}
                                  dayDifference={dayDifference}
                                  priceForDays={priceForDays}
                                  discount={discount}
                                  discountType={discountType}
                                  serviceFees={guestServiceFee}
                                  total={total}
                                  sessionTimes={sessionTimes}
                                  guests={guests}
                                />
                            </Panel>
                            <Panel className={s.panelHeader}>
                                {
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            {
                        experienceType && <div>
                            <p className={s.textMuted}><FormattedMessage {...messages.mentorCancellationPolicy} /></p>
                            <p className="hidden-xs hidden-sm" style={{ fontSize: 14 }}>
                                <span className={cx(s.text)}>
                                    {
                                experienceType === '1' && <FormattedMessage {...messages.experienceType1} />
                              }
                                    {
                                experienceType === '2' && <FormattedMessage {...messages.experienceType2} />
                              }
                                </span>
                            </p>
                            <p className="hidden-md hidden-lg" style={{ fontSize: 12 }}>
                                {
                                experienceType === '1' && <span className={cx(s.text)}>A cooling off period does not automatically apply.</span>

                              }
                                {
                                experienceType === '2' && <span className={cx(s.text)}>You are entitled to a 14 day cooling off period.</span>

                              }
                            </p>
                        </div>
                      }
                                            {
                        cancellationPolicy && cancellationPolicy.length > 0 && cancellationPolicy.map((item, key) => (
                            <ul className={s.unorderPaddingLeft} style={{ fontSize: 12 }}>
                                <li>
                                    <p key={key}>
                                        <span className={cx(s.text)}>{item.policy.policyContent}</span>
                                    </p>
                                </li>
                            </ul>
                          ))
                      }
                                            {
                        cancellationDescription && cancellationDescription !== '' && <p style={{ fontSize: 12 }}>
                            <span className={cx(s.text)}>{cancellationDescription}</span>
                        </p>
                      }
                                        </Col>
                                    </Row>
                }
                            </Panel>
                        </div>
                    </Col>
                    <Col md={7} mdPull={5}>
                        <PaymentForm
                          hostDisplayName={hostDisplayName}
                          houseRules={houseRules}
                          allowedPersonCapacity={allowedPersonCapacity}
                          initialValues={initialValues}
                          priceForDays={priceForDays}
                          total={total}
                          discount={discount}
                          cleaningPrice={cleaningPrice}
                          basePrice={basePrice}
                          serviceFees={serviceFees}
                          currency={currency}
                          guests={guests}
                          base={base}
                          rates={rates}
                        />
                    </Col>
                </Row>
            </Grid>

        );
    }
}
Payment = reduxForm({
    form: 'Payment', // a unique name for this form
})(Payment);

const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = state => ({
    paymentCurrencyList: state.currency.availableCurrencies,
    paymentLoading: state.book.paymentLoading,
    paymentType: selector(state, 'paymentType'),
    account: state.account.data,
    children: state.children,
    parent: selector(state, 'parent'),
    child: selector(state, 'child'),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Payment)));

// export default withStyles(s)(Payment);
