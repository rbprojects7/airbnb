import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TR, TD } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';

class CompletedReservationHost extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            reservationId: PropTypes.number.isRequired,
            guestName: PropTypes.string.isRequired,
            guestLastName: PropTypes.string.isRequired,
            guestProfilePic: PropTypes.string.isRequired,
        }).isRequired
    };

    render() {
        const textStyle = {
            color: '#484848',
            backgroundColor: '#F7F7F7',
            fontFamily: 'Verdana, Geneva, sans-serif',
            fontSize: '16px',
            padding: '10px',
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
            background: '#6C68C6',
            borderColor: '#6C68C6',
            backgroundColor: '#6C68C6',
            color: '#ffffff',
            borderTopWidth: '1px',

        };

        const bookingTitle = {
            paddingBottom: '20px',
            fontWeight: 'bold',
            fontSize: '20px',
            lineHeight: '25px',
            margin: '0',
            padding: '0',
            textAlign: 'center'

        };

        const profilePic = {
            borderRadius: '999px',
            margin: '0',
            padding: '0',
            lineHeight: '150%',
            borderSpacing: '0',
            width: '125px'
        };

        const userName = {
            color: '#565a5c',
            fontSize: '26px',
            fontWeight: 'bold',
            paddingBottom: '5px',
        };

        const subTitle = {
            color: '#565a5c',
            fontSize: '18px',
            fontWeight: 'bold',
            paddingBottom: '5px',
        };

        const linkText = {
            color: '#00b0cd',
            fontSize: '18px',
            textDecoration: 'none',
            cursor: 'pointer',
        };

        const space = {
            paddingBottom: '20px',
        };
        const { content: { reservationId, blockUniqueId } } = this.props;
        const { content: { guestName, guestLastName, guestProfilePic } } = this.props;
        const messageURL = `${url}/review/writeReflection/${blockUniqueId}`;
        let imageURL;
        if (guestProfilePic) {
            imageURL = `${url}/images/avatar/medium_${guestProfilePic}`;
        }
        const contactURL = `${url}/user/reflections`;

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
                                        {
                                            guestProfilePic && <img style={profilePic} src={imageURL} height={125} />
                                        }
                                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                                        Please complete a form to tell parents about the learning progress at the end of this block.
                                        Parents will be asked to give a review of their experience with you when they receive your reflection.
                                    </div>

                                    <EmptySpace height={50} />
                                    <div>
                                        <a href={messageURL} style={buttonStyle}>Write a Reflection</a>
                                    </div>
                                    <EmptySpace height={40} />
                                </TD>
                            </TR>
                        </TBody>
                    </Table>
                    <EmptySpace height={50} />
                </div>
                <Footer />
                <EmptySpace height={20} />
            </Layout>
        );
    }

}

export default CompletedReservationHost;
