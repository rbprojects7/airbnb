import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, TBody, TR, TD} from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename, sitenamesender} from '../../../config';

class BookingExpiredHost extends Component {
    static propTypes = {
        content: PropTypes.shape({
            guestName: PropTypes.string.isRequired,
            hostName: PropTypes.string.isRequired,
            listTitle: PropTypes.string.isRequired,
            confirmationCode: PropTypes.number.isRequired,
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

	    const { content: {hostName, guestName, listTitle, confirmationCode } } = this.props;
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
									Your reservation ({confirmationCode}) from {guestName} at {listTitle} has expired.
									{' '}{guestName} will be fully refunded.
								</div>
                                    <EmptySpace height={40} />
                                    <div>
									Regards, <br />
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

export default BookingExpiredHost;
