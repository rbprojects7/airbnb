/* eslint-disable no-new */
import { CronJob } from 'cron';
import sequelize from '../../data/sequelize';
import { Reservation, ThreadItems, Block } from '../../data/models';
import moment from 'moment';

const reservationComplete = () => {

    new CronJob('1 1 17 * * *', async () => {

        let today = moment().format('HH:MM');
        let startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        let endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const getReservationIds = await Reservation.findAll({
           attributes: ['id', 'reservationState', 'hostId', 'checkIn', 'checkOut', 'guests', 'blockId', [sequelize.literal('TIMESTAMPDIFF(DAY, checkOut, NOW())'), 'day_difference']],
            having: {
                day_difference: {
                    $gte: 0
                },
                reservationState: 'approved',
            },             
            where: {
                checkOut: {
                    $between: [startDate, endDate]
                },
                endTime: {
                    $lte: today
                },
            },

        });

        if (getReservationIds != null && getReservationIds.length > 0) {
            await Promise.all(getReservationIds.map(async (item) => {
                const getBlockId = await Block.findOne({
                    attributes: ['id', 'blockState'],
                    where: {
                        blockState: {
                            $ne: 'completed'
                        }
                    }
                });
                if (getBlockId) {
                    await Block.update({
                        blockState: 'completed'
                    }, {
                        where: {
                            id: item.blockId
                        }
                    });
                }
                const getThreadId = await ThreadItems.findOne({
                    where: {
                        reservationId: item.id
                    }
                });
                if (getThreadId) {
                    await ThreadItems.create({
                        threadId: getThreadId.threadId,
                        sentBy: item.hostId,
                        type: 'completed',
                        startDate: item.checkIn,
                        endDate: item.checkOut,
                        personCapacity: item.guests,
                        reservationId: item.id
                    });
                }
                await Reservation.update({
                    reservationState: 'completed'
                }, {
                    where: {
                        id: item.id
                    }
                });
               
            }));

        }

    }, null, true, 'Europe/London');

};

export default reservationComplete;
