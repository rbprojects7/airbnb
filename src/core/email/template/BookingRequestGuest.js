import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Table, TBody, TR, TD} from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename, sitenamesender} from '../../../config';

class BookingRequestGuest extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            confirmationCode: PropTypes.number.isRequired,
            hostName: PropTypes.string.isRequired,
            guestName: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            listTitle: PropTypes.string.isRequired,
            threadId: PropTypes.number.isRequired,
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


        const { content: { guestName, listTitle, hostName, checkIn, threadId, confirmationCode} } = this.props;
        const checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
        const messageURL = `${url}/message/${threadId}/guest`;

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
                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                                      Booking reference: {confirmationCode}
                                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                      Your booking request for {listTitle} starting {checkInDate} has been sent to the mentor, {hostName}.<br /> <br />Normally mentors will send you a message if they can't approve straight away. Meanwhile, why don't you share the experience with your friends to help them achieve the minimum numbers?
                    </div>
                                    <EmptySpace height={40} />
                                    <div style={btnCenter}>
                                        <a href={messageURL} style={buttonStyle}>Message {hostName}</a>
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

export default BookingRequestGuest;
