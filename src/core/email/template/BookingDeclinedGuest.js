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

class BookingDeclinedGuest extends Component {
    static propTypes = {
        content: PropTypes.shape({
            hostName: PropTypes.string.isRequired,
            guestName: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            confirmationCode: PropTypes.number.isRequired,
            listTitle: PropTypes.string.isRequired,
        }).isRequired
    };

    render() {
        const textStyle = {
            color: '#484848',
            backgroundColor: '#F7F7F7',
            fontFamily: 'Verdana, Geneva, sans-serif',
            fontSize: '16px',
            padding: '35px',
        };
        const btnCenter = {
            textAlign: 'center'
        };
        const buttonStyle = {
            margin: 0,
            fontFamily: 'Verdana, Geneva, sans-serif',
            padding: '10px 16px',
            textDecoration: 'none',
            borderRadius: '2px',
            border: '1px solid',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontWeight: 'bold',
            fontSize: '18px',
            whiteSpace: 'nowrap',
            background: '#ffffff',
            borderColor: '#6C68C6',
            backgroundColor: '#6C68C6',
            color: '#ffffff',
            borderTopWidth: '1px',

        };


        const { content: { guestName, hostName, confirmationCode, checkIn, listTitle } } = this.props;
        const checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
        const actionURL = `${url}/s`;
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
                                        Hi {guestName},
                                      <EmptySpace height={20} />
                                        Booking reference: {confirmationCode}
                                        <EmptySpace height={10} />
                                    </div>
                                    <div>
                                        We're sorry to let you know that {hostName} has declined your request
					          for {listTitle} on {checkInDate}.
                  <EmptySpace height={10} />
                                        You have not been charged for this transaction.
                  <EmptySpace height={10} />
                                    </div>
                                    Please have a look for another experience.
                  <EmptySpace height={20} />
                                    <div style={btnCenter}>
                                        <a href={actionURL} style={buttonStyle}>Search listings</a>
                                    </div>
                                </TD>
                            </TR>
                        </TBody>
                    </Table>
                </div>
                <Footer />
                <EmptySpace height={20} />
            </Layout>
        );
    }
}

export default BookingDeclinedGuest;
