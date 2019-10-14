import React, { Component } from 'react';
import { PropTypes } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import {
        Button, 
        Form, 
        Grid,
        Row, FormGroup,
        Col,
        ControlLabel,
        FormControl,
        FieldGroup,
        Panel,
        Table
      } 
        from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Itinerary.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Components
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';
import ListCoverPhoto from '../ListCoverPhoto';
import Link from '../Link';
import StarRating from '../StarRating';
import SocialShare from '../ViewListing/SocialShare';


// Helper
import { generateTime } from '../Receipt/helper';

// Locale
import messages from '../../locale/messages';

class Itinerary extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      guest: PropTypes.number,
      guestServiceFee: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      reservationState: PropTypes.string.isRequired,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        zipcode: PropTypes.string.isRequired,
        reviewsCount: PropTypes.number.isRequired,
        reviewsStarRating: PropTypes.number.isRequired,
        bookingType: PropTypes.string,
        listingData: PropTypes.shape({
          checkInStart: PropTypes.string.isRequired,
          checkInEnd: PropTypes.string.isRequired
        }),
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.arrayOf({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        }),
      }),
      messageData: PropTypes.shape({
        id: PropTypes.number.isRequired
      }),
      hostData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
      }),
      chosenBlockData: PropTypes.any,
      childParentData: PropTypes.any
    })
  };

  static defaultProps = {
    data: null,
    chosenBlockData: [],
    childParentData: []
  };

  render() {
    const { data } = this.props;
    const { formatMessage } = this.props.intl;

    if(data === null){
      return <div> <FormattedMessage {...messages.errorMessage} /> </div>;
    } else {
        const { data, data: { id, listId, checkIn, checkOut, total, guests, guestServiceFee, currency, confirmationCode, reservationState }} = this.props;
        const { data: { hostData: { profileId, displayName,  picture } }} = this.props;
        const { data: { listData: { title, street, city, state, country, zipcode, bookingType } }} = this.props;
        const { data: { listData: { coverPhoto, listPhotos, reviewsCount, reviewsStarRating } }} = this.props;
        const { data: { listData: { listingData: { checkInStart, checkInEnd } } }} = this.props;
        const { data: { messageData } } = this.props;
        const { data: { chosenBlockData, childParentData } } = this.props;
      
        let checkInDate = checkIn ? moment(checkIn).format('ddd, Do MMM') : '';
        let checkOutDate = checkOut ? moment(checkOut).format('ddd, Do MMM') : '';
        let momentStartDate, momentEndDate, dayDifference, checkInTime, checkOutTime;
        if(checkIn != null && checkOut != null){
            momentStartDate = moment(checkIn);
            momentEndDate = moment(checkOut);
            dayDifference = momentEndDate.diff(momentStartDate, 'days');
        }
        if(checkInStart === 'Flexible'){
          checkInTime = formatMessage(messages.flexibleCheckIn);
        } else {
          checkInTime = generateTime(checkInStart);
        }

        if(checkInEnd === 'Flexible'){
          checkOutTime = formatMessage(messages.flexibleCheckIn);
        } else {
          checkOutTime = generateTime(checkInEnd);
        }

        let subTotal = total + guestServiceFee;
        let starRatingValue = 0;
        if (reviewsCount > 0 && reviewsStarRating > 0) {
          starRatingValue = Number(reviewsStarRating / reviewsCount)
        }

        return (
          <div className={cx(s.Container, s.spaceTop4, 'ViewProfile')}>
            <div className={s.containerResponsive}>
              <section className={cx(s.spaceTop5, s.space4)}>
                <Row className={s.landingContainer}>
                  <Col xs={12} sm={12} md={9} lg={9}>
                  {
                    reservationState === "approved" && <h2 className={s.textCenter}> 
                      <FormattedMessage {...messages.itinerayInstantTitle} /> 
                    </h2>
                  }
                    
                  {
                    bookingType === "request" &&  reservationState === "pending" && <div>
                      <h2 className={s.textCenter}> 
                      <FormattedMessage {...messages.itinerayRequestTitle} /> 
                    </h2>
                    <h4>
                    <FormattedMessage {...messages.itinerayRequestSubTitle} /> 
                    </h4>
                  </div>
                  }

                   {
                    bookingType === "instant"  && reservationState === "pending" && <div>
                      <h2 className={s.textCenter}> 
                      <FormattedMessage {...messages.itinerayInstantTitle} /> 
                    </h2>
                   
                  </div>
                  }

                    <div className={s.textCenter}>
                      <span><FormattedMessage {...messages.reservationCode} /></span>
                      <span>&nbsp;</span>
                      <span>{confirmationCode}</span>
                      <span>.&nbsp;</span>
                      <Link to={"/users/experiences/receipt/" + id}>
                        <FormattedMessage {...messages.viewReceipt} />
                      </Link>
                    </div>
                  </Col>
                </Row>
              </section>

              <Row>
                <Col md={7} lg={7}>
                  <Panel className={s.cardPanel}>
                    <div className={s.paneBody}>
                      <Row className={cx(s.rowTable, s.dateRange)}>
                        <div className={s.hideSm}>
                          {/* <Col sm={3} md={3} lg={3}>
                            <span className={s.textBold}>
                              <FormattedMessage {...messages.checkIn} />
                            </span>
                          </Col>
                          <Col sm={3} md={3} lg={3}>
                            <span>{checkInDate}</span><br />
                            <span>{checkInTime}</span>
                          </Col>
                          <Col sm={3} md={3} lg={3}>
                            <span className={s.textBold}>
                              <FormattedMessage {...messages.checkOut} />
                            </span>
                          </Col>
                          <Col sm={3} md={3} lg={3}>
                            <span>{checkOutDate}</span><br />
                            <span>{checkOutTime}</span>
                          </Col>
                        </div>
                        <div className={cx(s.textCenter, s.showSm)}>
                          <Col sm={6} xs={6}>
                            <span className={s.textBold}>
                              <FormattedMessage {...messages.checkIn} />
                            </span><br />
                            <span>{checkInDate}</span><br />
                            <span>{checkInTime}</span>
                          </Col>
                          <Col sm={6} xs={6}>
                            <span className={s.textBold}>
                              <FormattedMessage {...messages.checkIn} />
                            </span><br />
                            <span>{checkOutDate}</span><br />
                            <span>{checkOutTime}</span>
                          </Col> */}
                        
                      <Col sm={4} md={4} lg={4}>
                        <p className={s.textBold}><FormattedMessage {...messages.transferDate} /></p>
                      </Col>
                      <Col sm={4} md={4} lg={4}>
                        <p className={s.textBold}><FormattedMessage {...messages.startTime} /></p>
                      </Col>  
                      <Col sm={4} md={4} lg={4}>
                        <p className={s.textBold}><FormattedMessage {...messages.endTime} /></p>
                      </Col>
                          {
                    chosenBlockData && chosenBlockData .length > 0 && chosenBlockData.map((item, key) => {
                      return (
                        <Row key={key} className={s.noMarginLeft}>
                          <Col sm={4} md={4} lg={4}>
                            <p >{item.date}</p>
                          </Col>
                          <Col sm={4} md={4} lg={4}>
                            <p>{item.startTime}</p>
                          </Col>
                          <Col sm={4} md={4} lg={4}>
                            <p>{item.endTime}</p>
                          </Col>
                        </Row>
                      )
                    })
                  }
                        </div>
                      </Row>
                      <hr />
                    </div>
                    <div className={cx(s.textCenter, s.panelBody)}>
                      <Row className={cx(s.rowTable)}>
                        <Col md={3} lg={3} className={s.space1}>
                          <span className={s.textBold}>
                            <FormattedMessage {...messages.address} />
                          </span>
                        </Col>
                        <Col md={9} lg={9}>
                          <div>
                            <span>{street}</span> <br />
                            <span>{city}, {state} {zipcode}</span> <br />
                            <span>{country}</span> <br />
                          </div>
                          <div className={s.spaceTop2}>
                            <Link to={"/experience/" + listId}> 
                              <FormattedMessage {...messages.viewListing} />
                            </Link>
                          </div>
                        </Col>
                      </Row>
                      <hr />
                    </div>
                    <div className={cx(s.textCenter, s.panelBody)}>
                      <Row className={cx(s.rowTable)}>
                        <Col md={3} lg={3} className={s.space1}>
                          <span className={s.textBold}><FormattedMessage {...messages.host} /></span>
                        </Col>
                        <Col md={3} lg={3} className={s.showSm}>
                          <div className={cx(s.profileAvatarSection, s.profileAvatarLink)}>
                            <Avatar
                              source={picture}
                              height={115}
                              width={115}
                              className={s.profileAvatar}
                              withLink
                              profileId={profileId}
                            />
                          </div>
                        </Col>

                        <Col md={6} lg={6}>
                          <span>{displayName}</span> <br />
                          <div className={s.spaceTop1}>
                            <Link to={"/message/" + messageData.id + "/guest"}>  
                              <FormattedMessage {...messages.messageHost} />
                            </Link>
                          </div>
                        </Col>
                        <Col md={3} lg={3} className={s.hideSm}>
                          <div className={cx(s.profileAvatarSection, s.profileAvatarLink)}>
                            <Avatar
                              source={picture}
                              height={115}
                              width={115}
                              className={s.profileAvatar}
                              withLink
                              profileId={profileId}
                            />
                          </div>
                        </Col>
                      </Row>
                      <hr />
                    </div>
                    <div className={cx(s.textCenter, s.panelBody)}>
                      <Row className={cx(s.rowTable)}>
                        <Col md={3} lg={3}>
                          <span className={s.textBold}><FormattedMessage {...messages.billing} /></span>
                        </Col>
                        <Col md={3} lg={9}>
                          <table className={cx('table')}>
                            <tbody>
                              <tr className={s.tableText}>
                                <td className={cx(s.noBorder, s.noPadding)}>{guests} {guests > 1 ? "learners" : "learner"}</td>
                                <td className={cx(s.noBorder, s.noPadding)}>
                                  <CurrencyConverter
                                    amount={subTotal}
                                    from={currency}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                </Col>
                <Col lg={5} className={s.showLg}>
                   <div className={cx(s.imgContainer)}>
                    <div className={cx(s.parent)}>
                      <div className={cx(s.children)}>
                        <div className={cx(s.content)}>
                          <Link to={"/experience/" + listId}>
                            <ListCoverPhoto 
                              className={cx(s.imageContent)}
                              coverPhoto={coverPhoto}
                              listPhotos={listPhotos}
                              photoType={"x_medium"}
                              bgImage
                            />
                          </Link>
                    </div>
                  </div>
                  </div>
                  </div>
                </Col>
                <Col lg={5} className={s.showLg}>
                  <h1 className={cx(s.spaceTop2, s.space1)}>
                    <Link to={"/experience/" + listId} className={s.titleText}>
                      {title}
                    </Link>
                  </h1>
                  <div className={cx(s.space1)}>
                    <a className={s.textMuted}>{city}, {state}, {country}</a>
                  </div>
                  <div className={cx(s.space5)}>
                    <span><StarRating value={starRatingValue} name={"Itinerary"} className={s.starReview}/></span>
                    <span className={s.textMuted}>&nbsp;{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
                  </div>
                </Col>
                <div className={cx(s.space5)}>
                    <SocialShare listId={listId} />
                    <p className={s.suggestContentAlignment}><FormattedMessage {...messages.suggest} /></p>
                </div>
               </Row>
            </div>
          </div>
      );
    }

  }
}

export default injectIntl(withStyles(s)(Itinerary));
