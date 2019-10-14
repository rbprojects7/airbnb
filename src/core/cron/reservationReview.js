var CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import { Reservation, ThreadItems } from '../../data/models';
import { emailBroadcast } from './completedEmail';
import { emailBroadcastParent } from './emailBroadcastParent';
import { emailBroadcastStudent } from './emailBroadcastStudent';

const reservationReview = app => {

	new CronJob('1 1 17 * * *', async function () {
		console.log('holy moly completed review reservation');
		// get all reservation id
		const getReservationIds = await Reservation.findAll({
			attributes: ['id', 'reservationState', 'hostId', 'checkIn', 'checkOut', 'isSent', [sequelize.literal('TIMESTAMPDIFF(DAY, checkOut, NOW())'), 'day_difference']],
			having: {
				'day_difference': {
					$eq: 1
				},
				reservationState: 'completed',
				isSent: 0,
			}
		});

		// Update Reservation isSent field Status
		if (getReservationIds != null && getReservationIds.length > 0) {
			getReservationIds.map(async (item) => {
				// Get ThreadId
				let getThreadId = await ThreadItems.findOne({
					where: {
						reservationId: item.id
					}
				});

				let getUnsentId = await Reservation.findOne({
					where: {
						isSent: 0,
					}
				});
				if (getUnsentId) {
					await emailBroadcast(item.id);
					await Reservation.update({
						isSent: 1
					}, {
							where: {
								id: item.id
							}
						});
				}
			})
		}

	}, null, true, 'Europe/London');

};

export default reservationReview;
