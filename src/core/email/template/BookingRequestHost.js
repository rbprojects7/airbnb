import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import { Table, TBody, TR, TD } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import CurrencyView from '../modules/CurrencyView';
//helpers
import { calculateAge } from '../../../helpers/calculateAge';
import { url, sitename, sitenamesender } from '../../../config';
import {
  Row,
  Col
}
  from 'react-bootstrap';

class BookingRequestHost extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            reservationId: PropTypes.number.isRequired,
            confirmationCode: PropTypes.number.isRequired,
            isParentEnable: PropTypes.number.isRequired,
            hostName: PropTypes.string.isRequired,
            guestName: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            listTitle: PropTypes.string.isRequired,
            basePrice: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            convertedResponse: PropTypes.any,
            childFullData: PropTypes.any,
            startTime: PropTypes.string.isRequired,
            endTime: PropTypes.string.isRequired,
        }).isRequired

    };

    static defaultProps = {
        content: null,
        convertedResponse: [],
        childFullData: []
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

        const { content: { reservationId, confirmationCode, isParentEnable, bookingMessage, hostName, guestName, guestDateOfBirth, guestInfo, checkIn, checkOut } } = this.props;
        const { content: { listTitle, basePrice, total, hostServiceFee, currency, childFullData, convertedResponse } } = this.props;
        const checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
        const checkOutDate = checkOut != null ? moment(checkOut).format('ddd, Do MMM, YYYY') : '';
        const actionURL = `${url}/reservation/current`;
        let subtotal = 0;
        subtotal = total - hostServiceFee;
        let displayChildData;
        if (childFullData) {
            displayChildData = childFullData.map((child, key) => (
                <div>
                    {child.preferredName && <span>{child.preferredName}</span>}
            &nbsp;
                    {child.birthday &&
                    <span>Age {calculateAge(child.birthday)}</span>
            }
                    <br />
                    {child.preferences && <div>
                        <span>Profile notes:</span><br />
                        <span>{child.preferences}</span>
                    </div>
            }
                </div>
        ));
        }


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
                    Hi {hostName},
                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                                        {guestName} would like to book {listTitle} on the following Dates:<br />
                                        {
                      convertedResponse && convertedResponse.length > 0 && convertedResponse.map((item, key) => (
                          <Row key={key}>
                              <Col sm={4} md={4} lg={4}>
                                  <p >{item.date}:{' '}{item.startTime}-{item.endTime}</p>
                              </Col>
                          </Row>
                        ))
                    }
                                    </div>
                                    <EmptySpace height={10} />
                                    <div>
                                        {guestName} sent this additional message:<br />
                                        {bookingMessage}
                                    </div>
                                    <EmptySpace height={10} />
                                    {displayChildData && <div>
                    The learners will be:<br />
                                        {displayChildData}
                                    </div>}
                                    {isParentEnable == true &&
                                    <div>
                                        {guestName && <span>{guestName}</span>}
                      &nbsp;
                                        {guestDateOfBirth &&
                                        <span>Age {calculateAge(guestDateOfBirth)}</span>
                      }
                                        <br />
                                        {guestInfo && <div>
                                            <span>Profile notes:</span><br />
                                            <span>{guestInfo}</span>
                                        </div>
                      }
                                    </div>
                  }
                                    <EmptySpace height={40} />
                                    <div>
                    The payment total for this booking before service fees is <CurrencyView amount={subtotal} currency={currency} />
                                    </div>
                                    <EmptySpace height={40} />
                                    <div style={btnCenter}>
                                        <a href={actionURL} style={buttonStyle}>Accept or Decline</a>
                                    </div>
                                    <EmptySpace height={40} />
                                    <div>
                    Thanks, <br />
                                        {sitenamesender}
                                    </div>
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

export default injectIntl(BookingRequestHost);
