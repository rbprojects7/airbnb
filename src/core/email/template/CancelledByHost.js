import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TR, TD } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename, sitenamesender } from '../../../config';
import CurrencyView from '../modules/CurrencyView';

class CancelledByHost extends Component {
    static propTypes = {
        content: PropTypes.shape({
            hostName: PropTypes.string.isRequired,
            guestName: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            confirmationCode: PropTypes.number.isRequired,
            listTitle: PropTypes.string.isRequired,
            refundToGuest: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            cancellation: PropTypes.arrayOf(PropTypes.shape({
                dates: PropTypes.arrayOf(PropTypes.shape({
                    isSelected: PropTypes.bool.isRequired,
                    isDisabled: PropTypes.bool.isRequired,
                })),
            })),
            cancelledDate: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        }).isRequired
    };

    static defaultProps = {
        content: {
            refundToGuest: 0
        }
    };

    render() {
        const textStyle = {
            color: '#484848',
            backgroundColor: '#F7F7F7',
            fontFamily: 'Verdana, Geneva, sans-serif',
            fontSize: '16px',
            padding: '35px',
        };

        const { content: { guestName, hostName, confirmationCode, checkIn, listTitle, refundToGuest, currency, cancellation, cancelledDate, message, reservationId } } = this.props;
        const checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
        const momentStartDate = moment(checkIn).startOf('day');
        const today = moment();
        const interval = momentStartDate.diff(today, 'days');
        let isPastDay = false;
        if (interval < 0) {
            isPastDay = true;
        }

        // console.log('eopwefw3r23423',cancellation);

        return (
            <Layout>
                <Header color="rgb(255, 90, 95)" backgroundColor="#F7F7F7" />
                <div>
                    <Table width="100%" >
                        <TBody>
                            <TR>
                                <TD style={textStyle}>
                                    <EmptySpace height={20} />
                                    <div>
                                        Dear {guestName},
			        				</div>
                                    <EmptySpace height={20} />
                                    <div>
                                        <p>We are sorry to tell you that {hostName} has had to make a cancellation.</p>

                                        <p>{listTitle} </p>
                                        <p>Date of cancellation: {cancelledDate} </p>
                                        <p>Cancelled session(s) are:</p>
                                        {/* {
                                            cancellation && cancellation.length > 0 && Array.prototype.map.call(cancellation, function (item) { return (item.firstName + ' ' + item.lastName) }).join(", ")
                                        }
                                        <p>The following sessions have been cancelled:</p>
                                        {
                                            cancellation && cancellation.length > 0 && cancellation[0].dates && cancellation[0].dates.length > 0 && cancellation[0].dates.map((item, index) => {
                                                if (item.isSelected == false && item.isDisabled == false) {
                                                    return (
                                                        <p>
                                                            {item.date}{' '}{item.startTime}{' - '}{item.endTime}<br />
                                                        </p>
                                                    )
                                                }
                                            })
                                        } */}
                                        {
                                            cancellation && cancellation.length > 0 && cancellation.map((item, index) => {

                                                let dates = item.dates;
                                                let dateCount = 0;

                                                dates && dates.length > 0 && dates.map((values, key) => {
                                                    if (values.isSelected == false && values.isDisabled == false) {
                                                        dateCount += 1;
                                                    }
                                                })

                                                return (
                                                    <div>
                                                        {
                                                            dateCount > 0 && <div>
                                                                <p>{item.firstName} {item.lastName}</p>
                                                                {
                                                                    dates && dates.length > 0 && dates.map((values, key) => {
                                                                        if (values.isSelected == false && values.isDisabled == false) {
                                                                            return (
                                                                                <p>
                                                                                    {values.date}{' '}{values.startTime}{' - '}{values.endTime}<br />
                                                                                </p>
                                                                            )

                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }

                                        <p>{hostName} sent this message:</p>
                                        <p>{message}</p>
                                        <EmptySpace height={10} />
                                        <p>You will receive a full refund for all the sessions cancelled.</p>

                                        <p>We really hope your schedule is not too disrupted.</p>
                                    </div>
                                    <EmptySpace height={20} />
                                    {/* <div>
                                        Regards, <br />
                                        {sitenamesender}
                                    </div> */}
                                </TD>
                            </TR>
                        </TBody>
                    </Table>
                    <EmptySpace height={40} />
                </div>
                <Footer />
                <EmptySpace height={20} />
            </Layout>
        );
    }
}

export default CancelledByHost;
