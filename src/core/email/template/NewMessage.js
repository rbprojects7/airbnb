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

class NewMessage extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            receiverName: PropTypes.string.isRequired,
            userType: PropTypes.string.isRequired,
            senderName: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
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


        const { content: { receiverName, type, senderName, message, threadId } } = this.props;
        let messageURL = `${url}/message/${threadId}/guest`;
        if (type === "host") {
            messageURL = `${url}/message/${threadId}/host`;
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
                      Hi {receiverName},
                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                      You have a got a new message from {senderName}.
                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                      Message:
                    </div>
                                    <EmptySpace height={10} />
                                    <div>
                                        {message}
                                    </div>
                                    <EmptySpace height={40} />
                                    <div style={btnCenter}>
                                        <a href={messageURL} style={buttonStyle}>Respond to {senderName}</a>
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

export default NewMessage;
