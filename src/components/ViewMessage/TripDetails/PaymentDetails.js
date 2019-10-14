import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
// Redux
import { connect } from 'react-redux';
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

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Helper
import { convert } from '../../../helpers/currencyConvertion';

// Locale
import messages from '../../../locale/messages';

class PaymentDetails extends Component {
	static propTypes = {
		formatMessage: PropTypes.func,
		userType: PropTypes.string.isRequired,
		basePrice: PropTypes.number.isRequired,
		cleaningPrice: PropTypes.number.isRequired,
		monthlyDiscount: PropTypes.number,
		weeklyDiscount: PropTypes.number,
		currency: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		serviceFees: PropTypes.shape({
			guest: PropTypes.shape({
				type: PropTypes.string.isRequired,
				value: PropTypes.number.isRequired,
				currency: PropTypes.string.isRequired
			}).isRequired,
			host: PropTypes.shape({
				type: PropTypes.string.isRequired,
				value: PropTypes.number.isRequired,
				currency: PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
		base: PropTypes.string.isRequired,
		rates: PropTypes.object.isRequired,
		reservationData: PropTypes.shape({
			chosenBlockData: PropTypes.any
		})
	};

	static defaultProps = {
		startDate: null,
		endDate: null,
		basePrice: 0,
		cleaningPrice: 0,
		monthlyDiscount: 0,
		weeklyDiscount: 0,
		reservationData: {
			chosenBlockData: [],
		}
	};

	render() {
		const { childItemsData } = this.props;
		const { currency, userType } = this.props;
		const { serviceFees, base, rates, basePrice, personCapacity } = this.props;
		const { reservationData, reservationData: { chosenBlockData, guestServiceFee } } = this.props;
		const { reservationData: { hostServiceFee, guests, total, cleaningPrice, discount } } = this.props;
		const { formatMessage } = this.props.intl;
		let totalAmount = 0, hostEarnings = 0, discountType = 0;
		//let guestServiceFee = 10;
		//let hostServiceFee = 20;
		// let guestServiceFee = 0, hostServiceFee = 0;
		// let momentStartDate, momentEndDate, dayDifference, priceForDays = 0, discount = 0, discountType, total = 0, hostEarnings = 0;
		// if(startDate != null && endDate != null){
		//     momentStartDate = moment(startDate);
		//     momentEndDate = moment(endDate);
		//     dayDifference = momentEndDate.diff(momentStartDate, 'days');
		//     priceForDays = Number(basePrice) * Number(dayDifference);
		// }

		// if(dayDifference >= 7){
		//     if(monthlyDiscount > 0 && dayDifference >= 28) {
		//         discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
		// 		discountType = monthlyDiscount + "% " + formatMessage(messages.monthlyDiscount);
		//     } else {
		//         if(weeklyDiscount > 0){
		//           discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
		// 		  discountType = weeklyDiscount + "% " + formatMessage(messages.weeklyDiscount);
		//         }
		//     }
		// }

		// if(serviceFees){
		//     if(serviceFees.guest.type === 'percentage'){
		//         guestServiceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
		//     } else {
		//         guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
		//     }

		//     if(serviceFees.host.type === 'percentage'){
		//         hostServiceFee = priceForDays * (Number(serviceFees.host.value) / 100);
		//     } else {
		//         hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
		//     }

		// }

		if (userType === 'host') {
			totalAmount = total;
		} else {
			totalAmount = total + guestServiceFee;
		}

		hostEarnings = total - hostServiceFee;

		return (
			<div className={s.spaceTop6}>
				<h4 className={s.space4}>
					<span><FormattedMessage {...messages.payment} /></span>
				</h4>
				<Row className={s.textGray}>
					<Col xs={7} sm={7} className={s.textLeft}>
						<span>
							<CurrencyConverter
								amount={basePrice}
								from={currency}
							/>
						</span>
						{/* <span>  
							x {guests} {guests > 1 ? "guests" : "guest"}
						   </span> */}
						<span>
							x {guests} {guests > 1 ? "learners" : "learner"}
						</span>
					</Col>
					<Col xs={5} sm={5} className={s.textRight}>
						<CurrencyConverter
							amount={total}
							from={currency}
						/>
					</Col>
				</Row>

				{
					cleaningPrice != null && cleaningPrice > 0 && <Row className={s.textGray}>
						<Col xs={7} sm={7} className={s.textLeft}>
							<span><FormattedMessage {...messages.cleaningPrice} /></span>
						</Col>
						<Col xs={5} sm={5} className={s.textRight}>
							<span>
								<CurrencyConverter
									amount={cleaningPrice}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					discount > 0 && <Row className={s.textGray}>
						<Col xs={7} sm={7} className={s.textLeft}>
							<span>{discountType}</span>
						</Col>
						<Col xs={5} sm={5} className={cx(s.textRight, s.discountText)}>
							<span>
								- <CurrencyConverter
									amount={discount}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					userType === 'guest' && <Row className={s.textGray}>
						<Col xs={7} sm={7} className={s.textLeft}>
							<span><FormattedMessage {...messages.serviceFee} /></span>
						</Col>
						<Col xs={5} sm={5} className={s.textRight}>
							<span>
								<CurrencyConverter
									amount={guestServiceFee}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					userType === 'guest' && <hr className={s.horizontalLine} />
				}

				<Row className={cx(s.textBold, s.spaceTop2)}>
					<Col xs={4} sm={4} className={s.textLeft}>
						<span><FormattedMessage {...messages.subTotal} /></span>
					</Col>
					<Col xs={8} sm={8} className={s.textRight}>
						<span>
							<CurrencyConverter
								amount={totalAmount}
								from={currency}
							/>
						</span>
					</Col>
				</Row>

				{
					userType === 'host' && <Row className={s.textGray}>
						<Col xs={8} sm={8} className={s.textLeft}>
							<span><FormattedMessage {...messages.serviceFee} /></span>
						</Col>
						<Col xs={4} sm={4} className={s.textRight}>
							<span>
								-
			                	<CurrencyConverter
									amount={hostServiceFee}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					userType === 'host' && <hr className={s.horizontalLine} />
				}


				{
					userType === 'host' && <Row className={cx(s.textBold, s.spaceTop2, s.space3)}>
						<Col xs={8} sm={8} className={s.textLeft}>
							<span><FormattedMessage {...messages.youEarn} /></span>
						</Col>
						<Col xs={4} sm={4} className={s.textRight}>
							<span>
								<CurrencyConverter
									amount={hostEarnings}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}
				{/* {
	            	userType === 'host' && <Row className={cx(s.textBold, s.spaceTop2, s.space3)}>
		                {
							childItemsData.map((item,index) => 
							{
								return(
									<div>
									<Col xs={8} sm={8} className={s.textLeft}>
									<span><FormattedMessage {...messages.name} /></span>
								    </Col>
								    <Col xs={4} sm={4} className={s.textRight}>
									<span>{item.firstName}</span>
								    </Col>
									<Col xs={8} sm={8} className={s.textLeft}>
									<span><FormattedMessage {...messages.Age} /></span>
								    </Col>
								    <Col xs={4} sm={4} className={s.textRight}>
									<span>{item.birthday}</span>
								    </Col>
									<Col xs={8} sm={8} className={s.textLeft}>
									<span><FormattedMessage {...messages.preferedNotes} /></span>
								    </Col>
								    <Col xs={4} sm={4} className={s.textRight}>
									<span>{item.preferences}</span>
								    </Col>
                                    </div>
								);

							})
						}
		            </Row>
	            } */}
			</div>
		);
	}
}

const mapState = (state) => ({
	serviceFees: state.book.serviceFees,
	base: state.currency.base,
	rates: state.currency.rates
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentDetails)));

