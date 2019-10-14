import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename, sitenamesender} from '../../../config';

class ConfirmDocumentVerification extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            verificationStatus: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    };

    render() {
        const buttonStyle = {
            margin: 0,
            fontFamily: 'Verdana, Geneva, sans-serif',
            padding: '10px 16px',
            textDecoration: 'none',
            borderRadius: '2px',
            border: '1px solid',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontWeight: 'normal',
            fontSize: '18px',
            whiteSpace: 'nowrap',
            background: '#ffffff',
            borderColor: '#6C68C6',
            backgroundColor: '#6C68C6',
            color: '#ffffff',
            borderTopWidth: '1px',
        };

        const textStyle = {
            color: '#484848',
            backgroundColor: '#F7F7F7',
            fontFamily: 'Verdana, Geneva, sans-serif',
            fontSize: '16px',
            padding: '35px'
        };
        const { content: { verificationStatus, name} } = this.props;
        const verificationURL = `${url}/user/verification`;

        return (
            <Layout>
                <Header color="rgb(255, 90, 95)" backgroundColor="#F7F7F7" />
                <Body textStyle={textStyle}>
                    <div>
            Hi {name},
          </div>
                    <EmptySpace height={20} />
                    <div>
            Welcome to {sitename}!
          </div>
                    <EmptySpace height={20} />
                    <div>
            Your documents have been {verificationStatus} in the document verification process.
          </div>
                    <EmptySpace height={40} />
                    <div>
                        <a style={buttonStyle} href={verificationURL}>Check your profile</a>
                    </div>
                    <EmptySpace height={30} />
                    <div>
            Thanks, <br />
                        {sitenamesender}
                    </div>
                </Body>
                <Footer />
                <EmptySpace height={20} />
            </Layout>
        );
    }

}

export default ConfirmDocumentVerification;
