import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Table, TBody, TR, TD} from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename} from '../../../config';
import {
    Row,
    Col
  }
    from 'react-bootstrap';

class CompletedReviewParent extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            reservationId: PropTypes.number.isRequired,
            blockUniqueId: PropTypes.number.isRequired,
            guestName: PropTypes.string.isRequired,
            guestLastName: PropTypes.string.isRequired,
            guestProfilePic: PropTypes.string.isRequired,
            hostName: PropTypes.string.isRequired,
            hostLastName: PropTypes.string.isRequired, 
            activePhoto: PropTypes.string.isRequired,
            convertedResponse: PropTypes.any,
            title: PropTypes.string.isRequired,
            street: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            zipcode: PropTypes.string.isRequired,
        }).isRequired
    };

    static defaultProps = {
        content: null,
        convertedResponse: [],
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
            borderRadius: '0px',
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
        const { content: {reservationId,blockUniqueId} } = this.props;
        const { content: {guestName, guestLastName, guestProfilePic, hostName, hostLastName, activePhoto, convertedResponse} } = this.props;
        const { content: {title,street, city, zipcode, state, country} } = this.props;
        const messageURL = `${url}/review/viewReflection/${reservationId}/${blockUniqueId}`;
        const hostmessageURL = `${url}/review/write/${reservationId}`;
        let imageURL, guestImageURL;
        if(activePhoto) {
            imageURL = `${url}/images/upload/x_medium_${activePhoto}`;
        }
        if (guestProfilePic) {
            guestImageURL = `${url}/images/avatar/medium_${guestProfilePic}`;
        }
        const contactURL = `${url}/page/reviewsystem.pdf`;

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
                        activePhoto && <img style={profilePic} src={imageURL} height={125} />
                      }
                       </div>
                       <EmptySpace height={20} />
                                    <div>
                                 Mentored by {hostName}.
                                 <div>
                                        {
                        guestProfilePic && <img style={profilePic} src={guestImageURL} height={125} />
                      }
                       </div>
                                 <EmptySpace height={10} />
                                 { title }
                                 <EmptySpace height={10} />
                                 {city},{state},{country}
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
                                    <EmptySpace height={20} />
                                    <div>
                                    {hostName} {' '} {hostLastName} has shared a reflection about the learning progress for this experience.
                                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                                        <a style={linkText} href={contactURL}>Learn more about our review system here.</a>
                                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                                        <a href={messageURL} style={buttonStyle}> View reflection</a>
                                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                                    Now is a great time to write your reflection of {hostName}.  
                                    </div>
                                    <EmptySpace height={20} />
                                    <div>
                                        <a href={hostmessageURL} style={buttonStyle}> Write a reflection</a>
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

export default CompletedReviewParent;
