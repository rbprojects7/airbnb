import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import {
  Label, Row, FormGroup,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservation.css';
import logoUrl from './logo-small.jpg';
// Component
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';
// Redux action
import { sendMessageAction } from '../../actions/message/sendMessageAction';
// Locale
import messages from '../../locale/messages';
//helpers
import { calculateAge } from '../../helpers/calculateAge';


class ReservationItem extends Component {
  static propTypes = {
    noList: PropTypes.bool,
    userType: PropTypes.string.isRequired,
    threadId: PropTypes.number.isRequired,
    reservationId: PropTypes.number.isRequired,
    reservationState: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
    profileId: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    picture: PropTypes.string,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    sendMessageAction: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    formatMessage: PropTypes.func,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }).isRequired,
    coverPhoto: PropTypes.number,
    listPhotos: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    chosenBlockData: PropTypes.shape({
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      date: PropTypes.string,
  }),
  };

  static defaultProps = {
    noList: false,
    checkIn: null,
    checkOut: null
  };

  sendMessage(type) {
    const { sendMessageAction, threadId, userType, checkIn, checkOut, guests, reservationId, coverPhoto, listPhotos, chosenBlockData } = this.props;
    sendMessageAction(threadId, userType, null, type, checkIn, checkOut, guests, reservationId,null, null, null, null, null, coverPhoto, listPhotos, chosenBlockData);
  }

  reservationStyle() {
    const { reservationState } = this.props;
    let style, label;
    switch (reservationState) {
      case 'pending':
        label = <FormattedMessage {...messages.messageStatus5} />
        style = 'primary';
        break;
      case 'expired':
        label = <FormattedMessage {...messages.messageStatus9} />
        style = 'warning';
        break;
      case 'approved':
        label = <FormattedMessage {...messages.messageStatus4} />
        style = 'success';
        break;
      case 'declined':
        label = <FormattedMessage {...messages.messageStatus3} />
        style = 'danger';
        break;
      case 'completed':
        label = <FormattedMessage {...messages.panelHeader2} />
        style = 'success';
        break;
      case 'cancelled':
        label = <FormattedMessage {...messages.messageStatus11} />
        style = 'danger';
        break;
    }
    return <Label className={s.labelText} bsStyle={style}>{label}</Label>;
  }

  render() {
    const { threadId, userType, type, reservationId, reservationState, checkIn, checkOut, startTime, endTime } = this.props;

    const { listId, title, street, city, state, country, zipcode } = this.props;
    const { profileId, displayName, dateOfBirth, picture, phoneNumber, email } = this.props;
    const { guestServiceFee, hostServiceFee, total, currency } = this.props;
    const { noList } = this.props;
    const { childParentData, chosenBlockData, blockData, parentReviewsCount } = this.props;
    const { learnerReviewsCount, isParentReviewed, allReviewsCount, isParentEnable } = this.props;
    const { account: { userId, firstName, lastName }, dob } = this.props;
    let GuestDateOfBirth,hostDob,parentAge, hostAge;
    
    if(dateOfBirth){
      GuestDateOfBirth = moment(dateOfBirth,'YYYY-MM-DD').format('YYYY-MM-DD');    
    }
    if(dob){
      hostDob = moment(dob,'YYYY-MM-DD').format('YYYY-MM-DD');  
    }    
    if (GuestDateOfBirth) {
      parentAge = calculateAge(GuestDateOfBirth);
    }
    if (hostDob) {
      hostAge = calculateAge(hostDob);
    }

    let childNameData = [], listItemsData = [];
    
    if (childParentData && childParentData.length > 0) {
      childParentData.map((items, index) => {
        childNameData = items.childName;
        for (var i = 0; i < childNameData.length; i++) {
          let listItemsObject = {};
          listItemsObject['age'] = calculateAge(moment(childNameData[i].birthday,'YYYY-MM-DD').format('YYYY-MM-DD'));
          listItemsObject['firstName'] = childNameData[i].firstName;
          listItemsObject['lastName'] = childNameData[i].lastName;
          listItemsData.push(listItemsObject);
        }
      })
    }

    const childItems = listItemsData.map((d) => <div>{d.firstName}&nbsp;{d.lastName}&nbsp;<FormattedMessage {...messages.Age} />&nbsp;{d.age}</div>);

    let checkInDate = checkIn ? moment(checkIn).format('Do MMM - ') : '';
    let checkOutDate = checkOut ? moment(checkOut).format('Do MMM, YYYY') : '';
    let subTotal = 0;
    let enableCancel = false, enableIternary = false, enableViewReceipt = false, enableWriteReviews = false, enableViewReviews = false, completedReviews = false, enableParentReviews = false, enableReviewLink = false;
    if (reservationState === 'approved' || reservationState === 'pending') {
      enableCancel = true;
      enableIternary = true;
    }
    if (reservationState === 'completed') {
      enableIternary = true;
    }

    if (reservationState != 'cancelled') {
      enableReviewLink = true;
    }

    if (reservationState === 'approved' || reservationState === 'completed') {
      enableViewReceipt = true;
    }

    if (blockData && blockData.length > 0) {
      blockData.map((itemblock, index) => {
        //console.log("uuuu==",itemblock.blockState);
        if (itemblock.blockState === 'completed') {
          enableWriteReviews = true;
        }
      });
    }

    if (parentReviewsCount > 0) {
      enableViewReviews = true;
    }

    if (allReviewsCount === learnerReviewsCount.length) {
      completedReviews = true;
      enableParentReviews = true;
    }

    if (userType === 'host') {
      subTotal = total - hostServiceFee;
    } else {
      subTotal = total + guestServiceFee
    }

    let firstBlockStartTime, firstBlockEndTime, blockUniqueId;
    if (chosenBlockData) {
      firstBlockStartTime = chosenBlockData[0].startTime;
      firstBlockEndTime = chosenBlockData[0].endTime;
      blockUniqueId = chosenBlockData[0].blockUniqueId;
    }

    return (
      <tr>
        <td className={s.sectionTitleLight}>
          {this.reservationStyle()}
        </td>
        <td className={s.sectionTitleLight}>
          <span>{checkInDate}{checkOutDate}</span><br />
          <span><FormattedMessage {...messages.startTime} />{': '}{startTime}<br /><FormattedMessage {...messages.endTime} />{': '}{endTime}</span><br />
          {
            noList && userType === 'guest' && <span className={s.errorMessage}> <FormattedMessage {...messages.noList} /> </span>
          }
          {
            noList && userType === 'host' && <span className={s.errorMessage}> <FormattedMessage {...messages.notexist} /> </span>
          }

          {
            !noList && userType == "guest" && <div>
              <Link to={"/experience/" + listId}> {title} </Link><br />
              <span>{street}</span> <br />
              <span>{city}, {state} {zipcode} </span>
            </div>
          }

          {
            !noList && userType == "host" && <div>
              <Link to={"/experience/" + listId}> {title} </Link><br />
            </div>
          }

        </td>
        <td className={s.sectionTitleLight}>
          <div className={s.mediaContainer}>
            {
              !noList && (childItems || displayName || parentAge) && <span>

                {isParentEnable == true && userType == 'host' &&
                  <span>{displayName}{' '}
                    {
                      parentAge && parentAge != null && <span><FormattedMessage {...messages.Age} /> {parentAge}</span>
                    }
                  </span>
                }
                {isParentEnable == true && userType == 'guest' &&
                  <span>{firstName}{' '}{lastName}{' '}
                    {
                      hostAge && hostAge != null && <span><FormattedMessage {...messages.Age} /> {hostAge}</span>
                    }
                  </span>
                }
                {
                  listItemsData && listItemsData.length > 0 && listItemsData.map((d, key) => {
                    return (
                      <div key={key}>
                        {d.firstName}{' '}{d.lastName}{' '}
                        {d.age != null &&
                          <span><FormattedMessage {...messages.Age} />{' '}{d.age}</span>
                        }
                      </div>
                    )

                  })

                }
              </span>
            }
          </div>
        </td>
        <td className={s.sectionTitleLight}>
          <div className={s.mediaContainer}>
            <Avatar
              source={picture}
              height={50}
              width={50}
              title={displayName}
              className={cx(s.profileAvatar, s.profileAvatarLink)}
              withLink={noList ? false : true}
              profileId={profileId}
            />
          </div>
          <Link to={"/users/show/" + profileId} className={s.sectionTitleLight}>{displayName}</Link> <br />
          <ul className={s.listLayout}>
            <li>{phoneNumber}</li>
            <li>{email}</li>
          </ul>
        </td>


        {/* {reservationId} */}
        <td className={s.sectionTitleLight}>
          <p>
            <CurrencyConverter
              amount={subTotal}
              className={s.bookItPrice}
              from={currency}
            />

          </p>
          <ul className={s.listLayout}>

            {
              !noList && <li className={s.reservationList}><Link to={"/message/" + threadId + "/" + userType}> <FormattedMessage {...messages.messageHistroy} /></Link></li>
            }

            {
              noList && <li className={s.reservationList}><Link to={"/#"}><FormattedMessage {...messages.contactSupport} /></Link></li>
            }

            {
              !noList && userType === 'guest' && enableIternary && <li className={s.reservationList}><Link to={"/users/experiences/itinerary/" + reservationId}> <FormattedMessage {...messages.viewItinerary} /></Link></li>
            }
            {
              !noList && userType === 'guest' && <li className={s.reservationList}><Link to={"/users/experiences/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
            }
            {
              !noList && userType === 'host' && enableViewReceipt && <li className={s.reservationList}><Link to={"/users/experiences/receipt/" + reservationId}><FormattedMessage {...messages.viewReceipt} /></Link></li>
            }

            {
              !noList && userType === 'host' && !completedReviews && enableWriteReviews && type == "previous" && enableReviewLink && <li className={s.reservationList}><Link to={"/review/writeReflection/"  + blockUniqueId}><FormattedMessage {...messages.giveReflectionLearner} /></Link>
              </li>
            }
            {
              !noList && userType === 'host' && completedReviews && type == "previous" &&  enableReviewLink && <li className={s.reservationList}><Link to={"/review/viewReflection/" + reservationId + '/' + blockUniqueId}><FormattedMessage {...messages.ViewReflectionLearner} /></Link>
              </li>
            }


            {
              !noList && userType === 'host' && enableViewReviews && type == "previous" && parentReviewsCount > 0 &&  enableReviewLink &&  <li className={s.reservationList}><Link to={"/review/view/" + reservationId}><FormattedMessage {...messages.ViewReflectionYou} /></Link>
              </li>
            }

            {
              !noList && userType === 'host' && type == "previous" && parentReviewsCount == 0 &&  enableReviewLink &&  <li className={s.reservationList}><Link to={"/review/view/" + reservationId}><FormattedMessage {...messages.ViewReflectionYou} /></Link>
              </li>
            }

            {
              !noList && userType === 'guest' && enableViewReviews && type == "previous" && parentReviewsCount > 0 &&  enableReviewLink &&  <li className={s.reservationList}><Link to={"/review/view/" + reservationId}><FormattedMessage {...messages.ViewReflectionMentor} /></Link>
              </li>
            }

            {
              !noList && userType === 'guest' && enableWriteReviews && type == "previous" && parentReviewsCount == 0 &&  enableReviewLink &&  <li className={s.reservationList}><Link to={"/review/write/" + reservationId}><FormattedMessage {...messages.giveReflectionMentor} /></Link>
              </li>
            }
            {
              !noList && userType === 'guest' && enableParentReviews && type == "previous" && enableReviewLink &&   <li className={s.reservationList}><Link to={"/review/viewReflection/" + reservationId + '/' + blockUniqueId}><FormattedMessage {...messages.ViewReflectionLearner} /></Link>
              </li>
            }

            {
              !noList && userType === 'guest' && type == "previous" && !enableParentReviews &&  enableReviewLink &&  <li className={s.reservationList}><Link to={"/review/viewReflection/" + reservationId + '/' + blockUniqueId}><FormattedMessage {...messages.ViewReflectionLearner} /></Link>
              </li>
            }
            {
              !noList && userType === 'host' && reservationState === 'pending' && type == "current" && <li>
                <a onClick={() => this.sendMessage('approved')}>
                  <FormattedMessage {...messages.approve} />
                </a>
              </li>
            }
            {
              !noList && userType === 'host' && reservationState === 'pending' && type == "current" && <li>
                <a onClick={() => this.sendMessage('declined')}>
                  <FormattedMessage {...messages.decline} />
                </a>
              </li>
            }
            
            {
              !noList && enableCancel && userType === 'guest' && <li> <Link to={"/cancel/" + reservationId + "/" + userType}><FormattedMessage {...messages.cancel} /></Link></li>
            }

          </ul>
        </td>
      </tr>
    );
  }
}

const mapState = (state) => ({
  account: state.account.data,
  dob: state.account.data.dateOfBirth
});

const mapDispatch = {
  sendMessageAction,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ReservationItem));