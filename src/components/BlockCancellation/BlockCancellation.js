import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../locale/messages';
import Proptypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

//Redux -form
import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';
import { formValueSelector, initialize } from 'redux-form';

//moment
import moment from 'moment';

//Bootstrap
import {
    Button,
    Grid,
    Row,
    FormGroup,
    Col,
    FormControl,
    FieldGroup,
    Panel
} from 'react-bootstrap';
import cx from 'classnames';

//css
import s from '../Cancellation/Cancellation.css';

//Internal Components
import Summary from '../Cancellation/Summary';
import DetailsForHost from '../Cancellation/DetailsForHost';
import Link from '../Link';
import Avatar from '../Avatar';
import ListCoverPhoto from '../ListCoverPhoto';
import HouseRules from '../ListPlaceStep1/HouseRules';
import CurrencyConverter from '../CurrencyConverter';

import submit from './submit';
import validate from './validate';

// Helper
import { convert } from '../../helpers/currencyConvertion';

class BlockCancellation extends Component {

    static Proptypes = {
        data: Proptypes.shape({
            id: Proptypes.string.isRequired,
            blockUniqueId: Proptypes.int,
            price: Proptypes.int,
            sessionTime: Proptypes.arrayOf(Proptypes.shape({
                date: Proptypes.string.isRequired,
                startTime: Proptypes.number.isRequired,
                endTime: Proptypes.number.isRequired,
            })),
            listingItem: Proptypes.object.isRequired
        }),
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        // this.handleCancel = this.handleCancel.bind(this);
    }

    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                    {...input}
                    className={className}
                    componentClass="textarea"
                    placeholder={label}
                >
                    {children}
                </FormControl>
            </FormGroup>
        );
    }


    render() {
        const { data, data: { sessionTime, listingItem, price, id, reservationItem }, handleSubmit } = this.props;
        const { message } = this.props;
        const { cancellation } = this.props;
        const { serviceFees, base, rates } = this.props;

        let isDisabled = true;
        if (message) {
            isDisabled = false;
        }
        let userType = 'host';
        let interval = sessionTime && sessionTime.length > 0 ? sessionTime.length : 0;
        let hours = moment("00:00", "HH:mm");
        let totalGuests = 0, priceForGuests = 0, hostServiceFee = 0;
        let currency = listingItem.listingData ? listingItem.listingData.currency : 'GBP';
        let cancelledHour = 0, amountPerHour = 0, refundPerPerson = 0, totalRefund = 0;
        let momentLessHour = 0, momentLessMinute = 0, h = 0, m = 0, timeFromMinute;

        reservationItem && reservationItem.length > 0 && reservationItem.map((item, index) => {
            totalGuests += item.guests;
        });

        priceForGuests = price * totalGuests;

        if (serviceFees) {
            // if (serviceFees.guest.type === 'percentage') {
            //     guestServiceFee = priceForGuests * (Number(serviceFees.guest.value) / 100);
            // } else {
            //     guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
            // }

            if (serviceFees.host.type === 'percentage') {
                hostServiceFee = priceForGuests * (Number(serviceFees.host.value) / 100);
            } else {
                hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
            }

        }
        return (
            <div>
                <Grid>
                    <Row className={s.landingContainer}>
                        <form onSubmit={handleSubmit(submit)}>
                            <Col xs={12} sm={7} md={7} lg={7} >
                                <Summary
                                    userType={userType}
                                    firstName={listingItem.user.profile.firstName}
                                    experienceType={listingItem.listingData.experienceType}
                                    cancellationDescription={listingItem.listingData.cancellationDescription}
                                    cancellationPolicy={listingItem.cancellationPolicy}
                                    sessionTimes={sessionTime || undefined}

                                />
                                <Field
                                    className={s.textareaInput}
                                    name="message"
                                    component={this.renderFormControlTextArea}
                                />
                                {/* <p className={cx(s.landingStep, s.space3)}>
                                    <span><FormattedMessage {...messages.reservationCancel} /></span>
                                </p> */}
                                <FormGroup className={s.formGroup}>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <Link
                                            className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft, s.btnWidth)}
                                            to={"/experience"}
                                        >
                                            <FormattedMessage {...messages.keepBooking} />
                                        </Link>
                                        <Button
                                            className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight, s.btnWidth)}
                                            // onClick={() => this.handleCancel(cancellationDetails)}
                                            disabled={isDisabled}
                                            type="submit"
                                        >
                                            <FormattedMessage {...messages.cancelYourBooking} />
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={5} md={5} lg={5} className={s.spaceTop5} >
                                <Panel className={s.panelHeader}>
                                    <Row>

                                        <div className={cx(s.summaryCard, s.colCenter)}>
                                            <ListCoverPhoto
                                                className={cx(s.bannerImage, s.backgroundCover)}
                                                coverPhoto={listingItem.coverPhoto}
                                                listPhotos={listingItem.listPhotos}
                                                photoType={"x_medium"}
                                                bgImage
                                            />
                                            <div className={cx(s.hostProfilePhoto, s.pullRight, s.space3)}>
                                                <div className={cx(s.profileAvatarLink, s.profileAvatarSection)}>
                                                    <Avatar
                                                        source={listingItem.user.profile.picture}
                                                        title={listingItem.user.profile.firstName}
                                                        className={s.profileAvatar}
                                                    />
                                                </div>
                                            </div>
                                            {/* <Panel className={s.panelHeader}> */}
                                            <div className={cx(s.textMuted, s.space2, s.spaceCover, s.spaceTop2)}>
                                                <span><FormattedMessage {...messages.hostedBy} /> {listingItem.user.profile.firstName}</span>
                                            </div>
                                            <div className={cx(s.textLarge, s.space1, s.spaceCover)}>
                                                <span>{listingItem.title}</span>
                                            </div>
                                            <div className={cx(s.textMuted, s.spaceCover)}>

                                                <div> {listingItem.city}, {listingItem.state}, {listingItem.country} </div>
                                            </div>
                                            <div>
                                                <hr className={s.horizondalLine} />
                                            </div>    
                                            <div className={s.paddingTop2}>
                                                {/* <hr className={s.horizondalLine} /> */}

                                                {
                                                    sessionTime.map((item, key) => {
                                                        //https://stackoverflow.com/questions/34247283/how-to-subtract-2-times-with-moment-js-then-subtract-some-minutes/34255728#34255728
                                                     
                                                        let convertedStartTime = moment.utc(item.startTime, "HH:mm");
                                                        let convertedEndTime = moment.utc(item.endTime, "HH:mm");
                                                        if (convertedEndTime.isBefore(convertedStartTime)) convertedEndTime.add(1, 'day');
                                                        let d = moment.duration(convertedEndTime.diff(convertedStartTime));
                                                        let s = moment.utc(+d).format('HH:mm');
                                                        let splittedHour = s.split(':');
                                                        // console.log('hours',hours.format('HH:mm'), splittedHour)
                                                        // hours = hours.add(splittedHour[0],'h').add(splittedHour[1], 'm');
                                                        momentLessHour += Number(splittedHour[0]); 
                                                        momentLessMinute += Number(splittedHour[1]);
                                                        
                                                        m = momentLessMinute % 60;
                                                        h = (momentLessMinute - m) / 60;

                                                        timeFromMinute = h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();
                                                        let splittedMinute = timeFromMinute.split(':');
                                                        let hourFromMinute = Number(splittedMinute[0]);
                                                        let minuteFromMinute = Number(splittedMinute[1]);

                                                        let finalHour = momentLessHour + hourFromMinute;
                                                        cancelledHour = finalHour + (minuteFromMinute > 0 ? '.' + minuteFromMinute : '');
                                                        //  cancelledHour = hours.format("HH.mm");
                                                        // cancelledHour = 0;
                                                        amountPerHour = (priceForGuests - hostServiceFee) / Number(cancelledHour).toFixed(2);
                                                        refundPerPerson = (amountPerHour * cancelledHour).toFixed(2);
                                                        totalRefund = (refundPerPerson * totalGuests).toFixed(2)
                                                        // console.log('qwdqweqwe', cancelledHour, finalHour);
                                                        return (
                                                            <div>
                                                                <Col sm={8} md={8} lg={8}>
                                                                    <p >{item.date}</p>
                                                                </Col>
                                                                <Col sm={2} md={2} lg={2}>
                                                                    <p>{item.startTime}</p>
                                                                </Col>
                                                                <Col sm={2} md={2} lg={2}>
                                                                    <p>{item.endTime}</p>
                                                                </Col>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                {/* {console.log('qwdqweqwe', hours, cancelledHour)} */}

                                                <div>
                                                    <Col sm={9} md={9} lg={9} className={s.space2}>
                                                        <FormattedMessage {...messages.experienceCost} />{' '}

                                                        <CurrencyConverter
                                                            amount={price}
                                                            from={currency}
                                                        />{' '}
                                                        x {totalGuests}
                                                    </Col>
                                                    <Col sm={3} md={3} lg={3} className={cx('text-right' ,s.space2)}>
                                                        <CurrencyConverter
                                                            amount={priceForGuests}
                                                            from={currency}
                                                        />
                                                    </Col>
                                                </div>
                                                <div>
                                                    <Col sm={8} md={8} lg={8} className={s.space2}>
                                                        <FormattedMessage {...messages.lessServiceFee} />
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} className={cx('text-right', s.space2)}>
                                                        <CurrencyConverter
                                                            amount={hostServiceFee}
                                                            from={currency}
                                                        />
                                                    </Col>
                                                </div>
                                                <div>
                                                    <Col sm={8} md={8} lg={8} className={s.space2}>
                                                        <FormattedMessage {...messages.yourPayout} />
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} className={cx('text-right', s.space2)}>
                                                        <CurrencyConverter
                                                            amount={priceForGuests - hostServiceFee}
                                                            currency={currency}
                                                        />
                                                    </Col>
                                                </div>
                                                <div>
                                                    <Col sm={8} md={8} lg={8} className={s.space2}>
                                                        <FormattedMessage {...messages.hostCancelMessage2} />
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} className={cx('text-right', s.space2)}>
                                                        <CurrencyConverter
                                                            amount={amountPerHour}
                                                            currency={currency}
                                                        />
                                                    </Col>
                                                </div>
                                                <div>
                                                    <Col sm={8} md={8} lg={8} className={s.space2}>
                                                        <FormattedMessage {...messages.hostCancelMessage3} />
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} className={cx('text-right', s.space2)}>
                                                       {cancelledHour}
                                                    </Col>
                                                </div>
                                                <div>
                                                    <Col sm={8} md={8} lg={8} className={s.space2}>
                                                        <FormattedMessage {...messages.hostCancelMessage4} />
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} className={cx('text-right', s.space2)}>
                                                        <CurrencyConverter
                                                            amount={refundPerPerson}
                                                            currency={currency}
                                                        />
                                                    </Col>
                                                </div>
                                                <div>
                                                    <Col sm={8} md={8} lg={8} className={s.space2}>
                                                        <FormattedMessage {...messages.hostCancelMessage5} />
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} className={cx('text-right', s.space2)}>
                                                        {totalGuests}
                                                    </Col>
                                                </div>

                                                <div>
                                                    <Col sm={8} md={8} lg={8} className={s.space2}>
                                                        <FormattedMessage {...messages.hostCancelMessage6} />
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} className={cx('text-right', s.space2)}>
                                                        <CurrencyConverter
                                                            amount={totalRefund}
                                                            currency={currency}
                                                        />
                                                    </Col>
                                                </div>

                                                {/* <p>
                                                    <FormattedMessage {...messages.faceValue} />{price / hours}
                                                </p> */}
                                            </div>
                                            {/* {console.log('qwded',hours)} */}

                                            {/* </Panel> */}

                                        </div>
                                        {/* </Col> */}
                                    </Row>
                                    <hr />


                                </Panel>
                            </Col>


                        </form>
                    </Row>
                </Grid>
            </div>
        )
    }
}

BlockCancellation = reduxForm({
    form: 'BlockCancellationForm',
    validate,
    onSubmit: submit
})(BlockCancellation);

const selector = formValueSelector('BlockCancellationForm'); // <-- same as form name

const mapState = (state) => ({
    message: selector(state, 'message'),
    serviceFees: state.book.serviceFees,
    base: state.currency.base,
    rates: state.currency.rates,
});

const mapDispatch = {
    initialize,
    submit
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(BlockCancellation)));