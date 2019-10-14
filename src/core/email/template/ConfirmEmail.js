import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename, sitenamesender} from '../../../config';

class ConfirmEmail extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            token: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
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
        const { content: {token, email, name} } = this.props;
        const verificationURL = `${url}/user/verification?confirm=${token}&email=${email}`;

        return (
            <Layout>
                <Header color="rgb(255, 90, 95)" backgroundColor="#F7F7F7" />
                <Body textStyle={textStyle}>
                    <div>
            Hi {name},
          </div>
                    <EmptySpace height={20} />
                    <div>
            Welcome to TutorHere. <br />
                        <EmptySpace height={10} />
                        <div>In order to get started, you need to confirm your email address.</div>
                    </div>
                    <EmptySpace height={40} />
                    <div>
                        <a style={buttonStyle} href={verificationURL}>Confirm your email</a>
                    </div>
                    <EmptySpace height={30} />
                </Body>
                <Footer />
                <EmptySpace height={20} />
            </Layout>
        );
    }

}

export default ConfirmEmail;
