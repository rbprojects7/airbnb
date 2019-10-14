import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TR, TD } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename, sitenamesender } from '../../../config';
import CurrencyView from '../modules/CurrencyView';
import { parse } from 'url';

class CancelledByGuest extends Component {
	static propTypes = {
		content: PropTypes.shape({
			hostName: PropTypes.string.isRequired,
			guestName: PropTypes.string.isRequired,
			checkIn: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
			listTitle: PropTypes.string.isRequired,
			payoutToHost: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired,
			cancellation: PropTypes.arrayOf(PropTypes.shape({
				dates: PropTypes.arrayOf(PropTypes.shape({
					isSelected: PropTypes.bool.isRequired,
					isDisabled: PropTypes.bool.isRequired,
					date: PropTypes.string.isRequired,
					startTime: PropTypes.string.isRequired,
					endTime: PropTypes.string.isRequired,
				})),
			})),
			cancelledDate: PropTypes.string.isRequired,
			message: PropTypes.string.isRequired,
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

		const { content: { guestName, hostName, confirmationCode, checkIn, listTitle, payoutToHost, currency, cancellation, cancelledDate, message } } = this.props;
		const checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
		const momentStartDate = moment(checkIn).startOf('day');
		const today = moment();
		const interval = momentStartDate.diff(today, 'days');
		let isPastDay = false;
		if (interval < 0) {
			isPastDay = true;
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
										Dear {hostName},
			        				</div>
									<EmptySpace height={20} />
									<div>
										<p>We are sorry to tell you that {guestName} has made a cancellation.</p>

										<p>{listTitle} </p>
										<p>Date of cancellation: {cancelledDate} </p>
										{
											cancellation && cancellation.length > 0 && cancellation.map((item, index) => {

												let dates = item.dates;
												let dateCount = 0;

												dates && dates.length > 0 && dates.map((values, key) => {
													if (values.isSelected == true && values.isDisabled == false) {
														dateCount += 1;
													}
												})

												return (
													<div>
														{
															 dateCount > 0 && <div>
																<p>{item.firstName} {item.lastName} has cancelled the following sessions:</p>
																{
																	dates && dates.length > 0 && dates.map((values, key) => {
																		if (values.isSelected == true && values.isDisabled == false) {
																			return (
																				<p>
																					 {values.date}{' '}{values.startTime}{' - '}{values.endTime}<br />
																				</p>
																			)

																		}
																	})
																}
															</div>
														}
													</div>
												)
											})
										}
										<p>{guestName} sent this message:</p>
										<p>{message}</p>
										<EmptySpace height={10} />
										<p>You don't need to do anything. Someone from TutorHere will contact you shortly to confirm if a refund will be made according to the cancellation policy.</p>
									</div>
									<EmptySpace height={20} />
									{/* <div>
										Regards, <br />
										{sitenamesender}
									</div> */}
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

export default CancelledByGuest;
