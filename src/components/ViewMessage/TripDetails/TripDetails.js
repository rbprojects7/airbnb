import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import { graphql, compose } from 'react-apollo';
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
	Label
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';
//helpers
import { calculateAge } from '../../../helpers/calculateAge';
//Component
import PaymentDetails from './PaymentDetails';
import CancelDetails from './CancelDetails';
import Link from '../../Link';
import GetThreadItemsChildQuery from './GetThreadItemsChildQuery.graphql';

// Locale
import messages from '../../../locale/messages';

class TripDetails extends Component {
    static propTypes = {
		formatMessage: PropTypes.func,
		listId: PropTypes.number.isRequired,
		actionType: PropTypes.string.isRequired,
    	userType: PropTypes.string.isRequired,
    	title: PropTypes.string.isRequired,
    	startDate: PropTypes.string.isRequired,
    	endDate: PropTypes.string.isRequired,
    	personCapacity: PropTypes.number.isRequired,
    	basePrice: PropTypes.number.isRequired,
       	cleaningPrice: PropTypes.number.isRequired,
      	currency: PropTypes.string.isRequired,
      	monthlyDiscount: PropTypes.number,
       	weeklyDiscount: PropTypes.number,
       	cancelData: PropTypes.shape({
            guestServiceFee: PropTypes.number,
            hostServiceFee: PropTypes.number,
            refundToGuest: PropTypes.number,
            payoutToHost: PropTypes.number,
            total: PropTypes.number,
            currency: PropTypes.string,
		}),
		reservationData: PropTypes.shape({
			chosenBlockData: PropTypes.any
		}),
		childParentData: PropTypes.shape({
			childName: PropTypes.shape({
			  id: PropTypes.number.isRequired,
			  firstName: PropTypes.string,
			  lastName: PropTypes.string,
			  preferredName: PropTypes.string,
			  birthday: PropTypes.string,
			  preferences: PropTypes.string
			})
		  })
    };

    static defaultProps = {
    	title: '',
    	startDate: null,
    	endDate: null,
		personCapacity: 0,
		reservationData: {
			chosenBlockData: [],
			// guestServiceFee: 0,
			// hostServiceFee: 0,
			// basePrice: 0,
			// total: 0,
			// guests: 0
		},
		actionType: null
    };

    render() {
		const { childParentData: { getAllThreadItemsChild } } = this.props;
		const { title, startDate, endDate, personCapacity, listId, reservationId, threadId, actionType } = this.props;
		const { formatMessage } = this.props.intl;
    	const { basePrice, cleaningPrice, weeklyDiscount, monthlyDiscount, userType, currency, cancelData } = this.props;
		const { reservationData, reservationData: { chosenBlockData } } = this.props;
		let checkIn = startDate != null ? moment(startDate).format('ddd, Do MMM') : '';
    	let checkOut = startDate != null ? moment(endDate).format('ddd, Do MMM') : '';
    	let isCancelled = false;
    	if(cancelData) {
    		isCancelled = true;
		}
		let childNameData = [], childItemsData = [];
		if (getAllThreadItemsChild) {
			getAllThreadItemsChild.map((item, index) => {
          item.childParentData.map((child, index) => {
            childNameData = child.childName;
            for (var i = 0; i < childNameData.length; i++) {
              let childItemsObject = {};
              childItemsObject['childId'] = childNameData[i].childId;
              childItemsObject['firstName'] = childNameData[i].firstName;
              childItemsObject['lastName'] = childNameData[i].lastName;
              childItemsObject['birthday'] = calculateAge(childNameData[i].birthday);
              childItemsObject['preferences'] = childNameData[i].preferences;
              childItemsData.push(childItemsObject);
            }
           })
        })
	  }
	  let viewInquiry = 0;
	  if((userType=="host" || userType=="guest") && actionType=="inquiry")
	  {
		  viewInquiry = 1;
      }
	  


        return (
            <div className={cx(s.space4, s.spaceTop5, s.sidebarContainer)}>
			    <div className={s.space4}>
					<h4><FormattedMessage {...messages.tripDetails} /></h4>
			    </div>
			    <div className={s.space4}>
			    	<Link to={"/experience/" + listId} className={s.timeText}>
			        	<h4>{title}</h4>
			        </Link>
			    </div>
			    {/* <div className={s.space2}>
			        <hr className={s.horizondalLine} />
			        <Row className={cx(s.spaceTop3, s.space3)}>
			            <Col xs={5} sm={5}>
			            <div className={cx(s.textGray, s.space1)}>
			                <span><FormattedMessage {...messages.checkIn} /></span>
			            </div>
			            <div className={s.checkInDate}>{checkIn}</div>
			            </Col>
			            <Col xs={1} sm={1}>
			            <FontAwesome.FaChevronRight className={cx(s.textGray, s.chevronIcon)} />
			            </Col>
			            <Col xs={5} sm={5} className={cx(s.pullRight, s.textLeft)}>
			            <div className={cx(s.textGray, s.space1)}>
			                 <span><FormattedMessage {...messages.checkOut} /></span>
			            </div>
			            <div className={s.checkInDate}>{checkOut}</div>
			            </Col>
			        </Row>
			        <hr className={s.horizondalLine} />
			    </div> */}
			    <div className={s.space2}>
			        {/* <div className={cx(s.textGray, s.space1)}>
						<span><FormattedMessage {...messages.guests} /></span>
			        </div>
			        <div className={s.space3}>
						<span>{personCapacity} {personCapacity > 1 ? formatMessage(messages.guestsCapcity) : formatMessage(messages.guestCapcity)}</span>
			        </div> */}
			        {
						
						!isCancelled && viewInquiry==0 && <PaymentDetails 
				        	userType={userType}	
				        	startDate={startDate}
				        	endDate={endDate}
				        	basePrice={basePrice}
				        	cleaningPrice={cleaningPrice}
				        	weeklyDiscount={weeklyDiscount}
				        	monthlyDiscount={monthlyDiscount}
							currency={currency}
							reservationData={reservationData}
							childItemsData={childItemsData}
				        />
			        }
			        {
			        	isCancelled && <CancelDetails 
				        	userType={userType}	
				        	cancelData={cancelData}
				        />
			        }
			        
			    </div>
			</div>
        );
    }
}

//export default injectIntl(withStyles(s)(TripDetails));

export default compose(
	withStyles(s),
	injectIntl,
    graphql(GetThreadItemsChildQuery, {
	  name: 'childParentData',
	  options: props => ({
	    variables: {
	      threadId: props.threadId,
	      reservationId: props.reservationId
	    },
	    fetchPolicy: 'network-only',
	  }),
	}),
  )(TripDetails);

