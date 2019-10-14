import React, { Component } from 'react';
import { PropTypes } from 'react';
import {connect} from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import moment from 'moment';
import {
    Grid,
    Row,
    Col,
    Panel,
    Table } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Receipt.css';

// Components
import CurrencyConverter from '../CurrencyConverter';
import Link from '../Link';

// Helper
import { generateTime } from './helper';

// Locale
import messages from '../../locale/messages';

class PaymentReceipt extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.func,
        siteName: PropTypes.string.isRequired,
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            basePrice: PropTypes.number.isRequired,
            cleaningPrice: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            guests: PropTypes.number,
            discount: PropTypes.number.isRequired,
            discountType: PropTypes.string,
            guestServiceFee: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            confirmationCode: PropTypes.number.isRequired,
            isParentEnable: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                street: PropTypes.string.isRequired,
                city: PropTypes.string.isRequired,
                state: PropTypes.string.isRequired,
                country: PropTypes.string.isRequired,
                zipcode: PropTypes.string.isRequired,
                listingData: PropTypes.shape({
                    checkInStart: PropTypes.string.isRequired,
                    checkInEnd: PropTypes.string.isRequired,
                    experienceType: PropTypes.number.isRequired,
                    cancellationDescription: PropTypes.string
                }),
                settingsData: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    listsettings: PropTypes.shape({
                        itemName: PropTypes.string.isRequired
                    })
                })),
                cancellationPolicy: PropTypes.arrayOf(PropTypes.shape({
                    policy: PropTypes.shape({
                        policyContent: PropTypes.string
                    })
                }))
            }),
            hostData: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
            }),
            guestData: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
            }),
            chosenBlockData: PropTypes.any,
        //   childParentData: PropTypes.shape({
        //     childName: PropTypes.shape({
        //       firstName: PropTypes.string
        //     }),
        // })
            childParentData: PropTypes.any,
        })
    };

    static defaultProps = {
        data: null
    };

    print(){
        window.print();
    }

    render() {
        const { data, siteName } = this.props;
        const { formatMessage } = this.props.intl;

        if(data === null){
            return <div> <FormattedMessage {...messages.errorMessage} /> </div>;
        }
        const { data: { id, checkIn, checkOut, confirmationCode, createdAt, updatedAt, isParentEnable }} = this.props;
        const { data: { basePrice, cleaningPrice, total, guests, discount, discountType, guestServiceFee, currency }} = this.props;
        const { data: { hostData, guestData }} = this.props;
        const { data: { listData: { title, street, city, state, country, zipcode } }} = this.props;
        const { data: { listData: { listingData: { checkInStart, checkInEnd, experienceType, cancellationDescription } } }} = this.props;
        const { data: { listData: { settingsData } }} = this.props;
        const { data: { chosenBlockData } } = this.props;
        const { data: { childParentData }} = this.props;
        const { data: { listData: { cancellationPolicy } } } = this.props;

        const ChildNames = childParentData.childName;
        let childName = [],
            childNames;
        if (childParentData && childParentData.length > 0) {
            childParentData.map((item, key) => {
                item.childName.map((item, key) => {
                    childNames = item.firstName+' '+item.lastName;
                    childName.push(childNames);
                });
            });
        }

            // let roomType = settingsData[0].listsettings.itemName;
        const createdDate = createdAt ? moment(createdAt).format('ddd, MMM Do, YYYY ') : '';
        const updatedDate = updatedAt ? moment(updatedAt).format('ddd, MMM Do, YYYY ') : '';
        const checkInDate = checkIn ? moment(checkIn).format('ddd, Do MMM') : '';
        const checkOutDate = checkOut ? moment(checkOut).format('ddd, Do MMM') : '';
        let momentStartDate,
            momentEndDate,
            dayDifference,
            dayPrice,
            checkInTime,
            checkOutTime;
        if(checkIn != null && checkOut != null){
            momentStartDate = moment(checkIn);
            momentEndDate = moment(checkOut);
            dayDifference = momentEndDate.diff(momentStartDate, 'days');
            dayPrice = basePrice * dayDifference;
        }
        if(checkInStart === 'Flexible'){
            checkInTime = formatMessage(messages.flexibleCheckIn);
        } else {
            checkInTime = generateTime(checkInStart);
        }

        if(checkInEnd === 'Flexible'){
            checkOutTime = formatMessage(messages.flexibleCheckIn);
        } else {
            checkOutTime = generateTime(checkInEnd);
        }

        const subTotal = total + guestServiceFee;

        return (
            <div className={cx(s.containerResponsive, s.spaceTop4)}>
                <div className={cx(s.space4, s.rowTable)}>
                    <Col xs={12} sm={12} md={3} lg={3} className={s.noPadding}>
                        <span className={s.textBold}>{createdDate}</span><br />
                        <span><FormattedMessage {...messages.receipt} /> # {id}</span>
                    </Col>
                </div>

                <div>
                    <Panel className={s.receiptPanel}>
                        <h2><FormattedMessage {...messages.customerReceipt} /></h2>
                        <div className={cx(s.spaceTop1, s.pullRight)}>
                            <a className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, "hidden-print")} onClick={this.print}>
                                <FormattedMessage {...messages.receipt} />
                            </a>
                        </div>
                        <div className={s.space1}>
                            <h6><FormattedMessage {...messages.confirmationCode} /> </h6>
                        </div>
                        <div className={s.space1}>
                            <h4>{confirmationCode}</h4>
                        </div>
                        <hr />
                        <Row className={s.space4}>
                            <Col sm={3} md={3} lg={3}>
                                <p className={s.textBold}>Attendee(s)</p>
                                {
                                    isParentEnable && <p>{guestData.displayName}</p>
                                    }
                                {
                                        childName.map((item, key) => (
                                            <p>{item}</p>
                                            ))
                                    }
                            </Col>
                            <Col sm={3} md={3} lg={3}>
                                <p className={s.textBold}>Location</p>
                                <p>{city}</p>
                            </Col>
                            {/* <Col sm={3} md={3} lg={3}>
                                <p className={s.textBold}><FormattedMessage {...messages.duration} /></p>
                                <p>{guests} {guests > 1 ? "guest" : "guests" }</p>
                            </Col>
                            <Col sm={3} md={3} lg={3}>
                                <span className={s.textBold}><FormattedMessage {...messages.accommodationType} /></span>
                                <p>{roomType}</p>
                            </Col> */}
                        </Row>

                        <hr />

                        <Row className={s.space4}>
                            <Col sm={3} md={3} lg={3}>
                                <p className={s.textBold}>Experience</p>
                                <h4>{title}</h4>
                                <p>
                                    <span>{street}</span> <br />
                                    <span>{city}, {state} {zipcode}</span> <br />
                                    <span>{country}</span> <br />
                                </p>
                            </Col>
                            <Col sm={3} md={3} lg={3}>
                                <p className={s.textBold}>Mentor</p>
                                <p>{hostData.displayName}</p>
                            </Col>
                            {/* <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.checkIn} /></span>
                                    <p>
                                        <span>{checkInDate}</span><br />
                                        <span>{checkInTime}</span>
                                    </p>
                                </Col>
                                <Col sm={3} md={3} lg={3}>
                                    <span className={s.textBold}><FormattedMessage {...messages.checkOut} /></span>
                                    <p>
                                        <span>{checkOutDate}</span><br />
                                        <span>{checkOutTime}</span>
                                    </p>
                                </Col> */}
                            <Col sm={6} md={6} lg={6} xs={12}>
                                <Row>
                                    <Col sm={4} md={4} lg={4} xs={4}>
                                        <p className={s.textBold}><FormattedMessage {...messages.transferDate} /></p>
                                    </Col>
                                    <Col sm={4} md={4} lg={4} xs={4}>
                                        <p className={s.textBold}><FormattedMessage {...messages.startTime} /></p>
                                    </Col>
                                    <Col sm={4} md={4} lg={4} xs={4}>
                                        <p className={s.textBold}><FormattedMessage {...messages.endTime} /></p>
                                    </Col>
                                </Row>
                                {
                                        chosenBlockData.map((item, key) => (
                                            <Row>
                                                <Col sm={4} md={4} lg={4} xs={4}>
                                                    <p key={key}>{item.date}</p>
                                                </Col>
                                                <Col sm={4} md={4} lg={4} xs={4}>
                                                    <p key={key}>{item.startTime}</p>
                                                </Col>
                                                <Col sm={4} md={4} lg={4} xs={4}>
                                                    <p key={key}>{item.endTime}</p>
                                                </Col>
                                            </Row>
                                            ))
                                    }
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <h2><FormattedMessage {...messages.reservationCharges} /></h2>
                                <table className={cx('table', 'table-bordered')}>
                                    <tbody>
                                        <tr>
                                            <th className={s.rowWidth}>
                                                <CurrencyConverter
                                                  amount={basePrice}
                                                  from={currency}
                                                />
                                                    &nbsp; x {guests} {guests > 1 ? "Learners" : "Learner"}
                                            </th>
                                            <td>
                                                <CurrencyConverter
                                                  amount={total}
                                                  from={currency}
                                                />
                                            </td>
                                        </tr>
                                        {
                                                cleaningPrice > 0 && <tr>
                                                    <th className={s.rowWidth}>
                                                        <FormattedMessage {...messages.cleaningPrice} />
                                                    </th>
                                                    <td>
                                                        <CurrencyConverter
                                                          amount={cleaningPrice}
                                                          from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }

                                        {
                                                discount > 0 && <tr>
                                                    <th className={s.rowWidth}>{discountType}</th>
                                                    <td>
                                                        <CurrencyConverter
                                                          amount={discount}
                                                          from={currency}
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                        <tr>
                                            <th className={s.rowWidth}><FormattedMessage {...messages.serviceFee} /></th>
                                            <td>
                                                <CurrencyConverter
                                                  amount={guestServiceFee}
                                                  from={currency}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className={s.rowWidth}><FormattedMessage {...messages.total} /></th>
                                            <td>
                                                <CurrencyConverter
                                                  amount={subTotal}
                                                  from={currency}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className={cx('table', 'table-bordered')}>
                                    <tbody>
                                        <tr>
                                            <th className={s.rowWidth}><FormattedMessage {...messages.paymentReceived} /> {updatedDate}</th>
                                            <td>
                                                <CurrencyConverter
                                                  amount={subTotal}
                                                  from={currency}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Panel>
                </div>
                <div className={s.spaceTop4}>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            {
                                experienceType && <div>
                                    <p className={s.textMuted}><FormattedMessage {...messages.mentorCancellationPolicy} /></p>
                                    <p>
                                        <span className={cx(s.text)}>
                                            {
                                                experienceType === '1' && <FormattedMessage {...messages.experienceType1} />
                                            }
                                            {
                                                experienceType === '2' && <FormattedMessage {...messages.experienceType2} />
                                            }
                                        </span>
                                    </p>
                                </div>
                            }
                            {
                                cancellationPolicy && cancellationPolicy.length > 0 && cancellationPolicy.map((item, key) => {
                                    return (
                                        <ul className={s.unorderPaddingLeft}>
                                            <li>
                                                <p key={key}>
                                                    <span className={cx(s.text)}>{item.policy.policyContent}</span>
                                                </p>
                                            </li>
                                        </ul>
                                    )
                                })
                            }
                            {
                                cancellationDescription && cancellationDescription != '' && <p>
                                    <span className={cx(s.text)}>{cancellationDescription}</span>
                                </p>
                            }
                        </Col>
                    </Row>
                </div>
                <div className={s.spaceTop4}>
                    <p>
                        <FormattedMessage {...messages.receiptInfo1} />
                    </p>
                </div>
            </div>
        );

    }
}

const mapState = state => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentReceipt)));
