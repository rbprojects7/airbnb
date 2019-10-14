import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TR, TD } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename, sitenamesender, fileuploadDir } from '../../../config';

class BookingConfirmationGuest extends Component {
    static propTypes = {
        content: PropTypes.shape({
            hostName: PropTypes.string.isRequired,
            guestName: PropTypes.string.isRequired,
            listTitle: PropTypes.string.isRequired,
            listCity: PropTypes.string.isRequired,
            threadId: PropTypes.number.isRequired,
            coverPhoto: PropTypes.number,
            listPhotos: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            }),
            chosenBlockData: PropTypes.shape({
                startTime: PropTypes.string,
                endTime: PropTypes.string,
                date: PropTypes.string,
            })
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

        const linkText = {
            color: '#800080',
            fontSize: '16px',
            textDecoration: 'none',
            cursor: 'pointer',
        };


        const { content: { guestName, hostName, listTitle, listCity, threadId } } = this.props;
        const contactURL = `${url}/message/${threadId}/guest`;
        const { content: { coverPhoto, listPhotos, chosenBlockData } } = this.props;
        let activePhoto;
        
        if(listPhotos != undefined && listPhotos.length > 0) {
            activePhoto = listPhotos[0].name;
             if(coverPhoto != undefined && coverPhoto != null){
               listPhotos.map((item) => {
                     if(item.id === coverPhoto) {
                         activePhoto = item.name;
                     }
                 })
             }
         }
         activePhoto =  `${url}/${fileuploadDir}x_medium_${activePhoto}`;
    
        //  activePhoto = 'https://www.TutorHere.org/images/upload/x_medium_75fb364d6c1fdc6e84fec9f0e9bdeae7.jpeg';
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
										You're all set for a great learning experience!
					        </div>
                                    <EmptySpace height={20} />
                                    <div>
                                        {
                                            activePhoto && <img src={activePhoto} />
                                        }
                                    </div>
                                    <div>
                                        {hostName} has confirmed your request to book {listTitle}.
                                      <p> Sessions: </p> 
                                        {
                                            chosenBlockData && chosenBlockData.length > 0 && chosenBlockData.map((item, index) => {
                                                return(
                                                    <div>
                                                    {item.date} {item.startTime} - {item.endTime}
                                                    </div>
                                                )
                                            })
                                        }
                                        Please review the details of your experience in your dashboard.
					        </div>
                                    <EmptySpace height={20} />
                                    <div>
										You can {' '}<a style={linkText} href={contactURL}>contact your mentor</a>{' '} if you have any further questions.
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

export default BookingConfirmationGuest;
