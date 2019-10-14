import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancel.css';

// Component
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';
import Cancellation from '../../components/Cancellation';

// Graphql
import CancelQuery from './Cancel.graphql';

class Cancel extends React.Component {
	static propTypes = {
		reservationId: PropTypes.number.isRequired,
		userType: PropTypes.string.isRequired,
		cancellationData: PropTypes.shape({
			loading: PropTypes.bool,
			cancelReservationData: PropTypes.object
		}).isRequired
	};

	static defaultProps = {
		cancellationData: {
			loading: true,
			cancelReservationData: {
				childParentData: [],
				chosenBlockData: [],
				cancellationDetails: [],
			}
		},
	};

	render() {
		const { cancellationData: { loading, cancelReservationData }, userType } = this.props;
		let cancellation = [], parentSessionDates = [];

		if (cancelReservationData && !loading && userType === "guest") {
			cancelReservationData && cancelReservationData.childParentData && cancelReservationData.childParentData.length > 0 && cancelReservationData.childParentData.map((item, index) => {
				let cancelData = {};
				let sessionDates = [];
				cancelData['learnerId'] = item.childName[0].id;
				cancelData['firstName'] = item.childName[0].firstName;
				cancelData['lastName'] = item.childName[0].lastName;
				{
					cancelReservationData && cancelReservationData.chosenBlockData && cancelReservationData.chosenBlockData.length > 0 && cancelReservationData.chosenBlockData.map((values, key) => {
						let childDates = {};
						let selectedDates;
						childDates['sessionId'] = values.id;
						childDates['date'] = values.date;
						childDates['startTime'] = values.startTime;
						childDates['endTime'] = values.endTime;
						selectedDates = cancelReservationData.cancellationDetails && cancelReservationData.cancellationDetails.length > 0 && cancelReservationData.cancellationDetails.find(x => x.sessionId === childDates.sessionId && x.learnerId === cancelData.learnerId);

						if (selectedDates) {
							childDates['isSelected'] = true;
							childDates['isDisabled'] = true;
						} else {
							childDates['isSelected'] = false;
							childDates['isDisabled'] = false;
						}
						sessionDates.push(childDates);
						cancelData['dates'] = sessionDates;
					});
				}

				cancellation.push(cancelData)
			});

			if (cancelReservationData && cancelReservationData.isParentEnable == true) {
				let parentData = {};
				parentData['learnerId'] = cancelReservationData.guestId;
				parentData['firstName'] = cancelReservationData.guestData.firstName;
				parentData['lastName'] = cancelReservationData.guestData.lastName;

				cancelReservationData && cancelReservationData.chosenBlockData && cancelReservationData.chosenBlockData.length > 0 && cancelReservationData.chosenBlockData.map((values, index) => {
					let parentDates = {};
					let selectedDates;
					parentDates['sessionId'] = values.id;
					parentDates['date'] = values.date;
					parentDates['startTime'] = values.startTime;
					parentDates['endTime'] = values.endTime;

					selectedDates = cancelReservationData.cancellationDetails && cancelReservationData.cancellationDetails.length > 0 && cancelReservationData.cancellationDetails.find(x => x.sessionId === parentDates.sessionId && x.learnerId === parentData.learnerId);

					if (selectedDates) {
						parentDates['isSelected'] = true;
						parentDates['isDisabled'] = true;
					} else {
						parentDates['isSelected'] = false;
						parentDates['isDisabled'] = false;
					}
					parentSessionDates.push(parentDates);
					parentData['dates'] = parentSessionDates;
				})

				cancellation.push(parentData)
			}
		}

		let initialValue = { cancellation: cancellation };

		if (loading) {
			return (
				<div className={s.space4}>
					<Loader type="text" />
				</div>
			);
		}

		if (cancelReservationData === null || cancelReservationData === undefined) {
			return <NotFound />;
		}

		return (
			<div className={s.root}>
				<div className={s.container}>
					<Cancellation userType={userType} data={cancelReservationData} initialValues={initialValue} cancellation={cancellation} />
				</div>
			</div>
		);
	}
}

export default compose(
	withStyles(s),
	graphql(CancelQuery,
		{
			name: 'cancellationData',
			options: (props) => ({
				variables: {
					reservationId: props.reservationId,
					userType: props.userType
				},
				fetchPolicy: 'network-only',
			})
		}
	),
)(Cancel);