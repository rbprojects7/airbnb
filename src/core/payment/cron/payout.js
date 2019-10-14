var CronJob = require('cron').CronJob;
import sequelize from '../../../data/sequelize';
import stripePackage from 'stripe';
import { payment } from '../../../config';
const stripe = stripePackage(payment.stripe.secretKey);
import { Reservation, ThreadItems, Block, SessionTime, Payout, TransactionHistory } from '../../../data/models';
import moment from 'moment';
import { single } from 'rxjs/operator/single';
// import { emailBroadcast } from './completedEmail';

const payout = app => {

    new CronJob('1 45 23 * * *', async function () {
    // new CronJob('0 * * * * *', async function () {
        console.log('holy moly payout');

        let yesterday = moment(moment().add(-1, 'days')).format('Do MMMM YYYY');
        // let yesterday = '1st January 2019';
        //get all reservation that have session yesterday

        const getReservationIds = await sequelize.query(`SELECT DISTINCT Reservation.id,Reservation.checkIn,Reservation.guests,Reservation.paymentState, Reservation.basePrice, Reservation.hostId, Reservation.hostServiceFee, Reservation.listId, Reservation.blockId, Reservation.totalSessionHours, Reservation.currency, SessionTime.id AS sessionId, SessionTime.date, SessionTime.startTime, SessionTime.endTime, User.email AS hostEmail FROM (((Reservation INNER JOIN SessionTime ON Reservation.id = SessionTime.reservationId) INNER JOIN Payout ON Reservation.hostId = Payout.userId) INNER JOIN User ON Reservation.hostId = User.id) WHERE paymentState = 'completed' AND reservationState = 'approved' AND date = '${yesterday}' AND isPayoutCompleted = 0;`, { type: sequelize.QueryTypes.SELECT });

        //get the listId's
        const getListId = await sequelize.query("SELECT DISTINCT Reservation.listId,Payout.payEmail, Payout.default, Payout.id AS payoutId FROM ((Reservation INNER JOIN SessionTime ON Reservation.id = SessionTime.reservationId) INNER JOIN Payout ON Reservation.hostId = Payout.userId) WHERE paymentState = 'completed' AND reservationState = 'approved' AND date = " + "'" + yesterday + "'" + " AND `default`= 1 AND isPayoutCompleted = 0;", { type: sequelize.QueryTypes.SELECT });

        //get hte cancelled guests count for reservation
        const getCancelledGuests = await sequelize.query(`SELECT DISTINCT Reservation.id, COUNT(DISTINCT CancellationDetails.id) AS cancelledGuests FROM Reservation INNER JOIN CancellationDetails ON Reservation.id = CancellationDetails.reservationId where date = '${yesterday}' AND paymentState = 'completed' AND reservationState = 'approved' GROUP BY Reservation.id;`, { type: sequelize.QueryTypes.SELECT });

        console.log('listId', getListId);
        console.log('aasdasda', getListId.length)
        console.log('zxcxzc', getReservationIds);
        console.log('cancelledGuests', getCancelledGuests);



        let singleList;
        let basePrice = 0, hostServiceFee = 0, payEmail, singleStartTime, singleEndTime, currency, reservationId, hostEmail, hostId;
        if (getReservationIds != null && getListId != null && getReservationIds.length > 0 && getListId.length > 0) {
            let getAllDate = await groupBy(getReservationIds, 'listId', 'blockId');
            function groupBy(objectArray, property) {
                return objectArray.reduce(function (acc, obj) {
                    var key = obj[property];
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(obj);
                    return acc;
                }, {});
            }

            console.log('getALlll', getAllDate);

            await Promise.all(getListId.map(async (item) => {

                let singleId = item.listId;
                let payEmail = item.payEmail;
                let payoutId = item.payoutId;
                let singlePayout = getAllDate[singleId];
                console.log('poi', singlePayout);
                let totalGuests = 0, finalGuestCount = 0;
                let momentLessHour, momentLessMinute, m, h, timeFromMinute, singleSession, singlePayoutAmount = 0;
                let status = 200, errorMessage, payout, transfer, findCancelledGuests, cancelledGuests = 0, transactionHistory, fees, sessionDate, blockId, listId;

                if (singlePayout && singlePayout.length > 0) {
                    await singlePayout.map(async (value, index) => {
                        findCancelledGuests = getCancelledGuests.find(function (element) {
                            return element.id == value.id;
                        });
                        console.log('founnssddd', findCancelledGuests);
                        if (findCancelledGuests) {
                            cancelledGuests = findCancelledGuests.cancelledGuests;
                        }
                        console.log('plplplplpl', cancelledGuests);

                        totalGuests = value.guests - cancelledGuests;
                        basePrice = value.basePrice;
                        hostServiceFee = value.hostServiceFee;
                        singleStartTime = value.startTime;
                        singleEndTime = value.endTime;

                        //Single session time difference
                        let convertedStartTime = moment.utc(singleStartTime, "HH:mm");
                        let convertedEndTime = moment.utc(singleEndTime, "HH:mm");
                        if (convertedEndTime.isBefore(convertedStartTime)) convertedEndTime.add(1, 'day');
                        let d = moment.duration(convertedEndTime.diff(convertedStartTime));
                        let s = moment.utc(+d).format('HH:mm');
                        let splittedHour = s.split(':');
                        // console.log('hours',hours.format('HH:mm'), splittedHour)
                        // hours = hours.add(splittedHour[0],'h').add(splittedHour[1], 'm');
                        momentLessHour = Number(splittedHour[0]);
                        momentLessMinute = Number(splittedHour[1]);

                        m = momentLessMinute % 60;
                        h = (momentLessMinute - m) / 60;

                        timeFromMinute = h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();
                        let splittedMinute = timeFromMinute.split(':');
                        let hourFromMinute = Number(splittedMinute[0]);
                        let minuteFromMinute = Number(splittedMinute[1]);

                        let finalHour = momentLessHour + hourFromMinute;
                        singleSession = finalHour + (minuteFromMinute > 0 ? '.' + minuteFromMinute : '');

                        singlePayoutAmount += ((Number(singleSession) / Number(value.totalSessionHours) * (Number(basePrice) - Number(hostServiceFee))) * Number(totalGuests));
                        console.log('vnmnmv', totalGuests, basePrice, hostServiceFee, singleSession, singleStartTime, singleEndTime);
                        // console.log('test time', convertedStartTime, convertedEndTime, d,s, splittedHour, momentLessHour, momentLessMinute, m,h, timeFromMinute, splittedMinute, hourFromMinute, minuteFromMinute, finalHour, singleSession);
                        finalGuestCount += Number(totalGuests);
                    });

                    if (!singlePayout) {
                        status == 400;
                    }

                    // payEmail = singlePayout[0].payEmail;
                    currency = singlePayout[0].currency;
                    reservationId = singlePayout[0].id;
                    hostEmail = singlePayout[0].hostEmail;
                    hostId = singlePayout[0].hostId;
                    fees = singlePayout[0].hostServiceFee;
                    blockId = singlePayout[0].blockId;
                    sessionDate = singlePayout[0].date;
                    listId = singlePayout[0].listId;

                    console.log('singlePayout', singlePayoutAmount, payEmail)

                    if (singlePayoutAmount && status == 200) {
                        try {
                            transfer = await stripe.transfers.create({
                                amount: Math.round(singlePayoutAmount.toFixed(2) * 100),
                                currency,
                                destination: payEmail,
                                transfer_group: 'Payout to Mentor',
                                metadata: {
                                    // reservationId,
                                    type: 'payout',
                                    hostEmail: hostEmail
                                }
                            });
                        } catch (error) {
                            status = 400;
                            errorMessage = error.message;
                        }
                    }
                    console.log('oajefwefe', transfer, status, errorMessage)
                    if (transfer && status == 200) {
                        try {
                            payout = await stripe.payouts.create({
                                amount: transfer.amount,
                                currency: 'gbp',
                            },
                                {
                                    stripe_account: payEmail
                                });
                        } catch (error) {
                            status = 400;
                            errorMessage = error.message;
                        }
                    }
                    console.log('payout', payout, status, errorMessage)

                    if (transfer && payout && status == 200) {
                        const transactionHistory = await TransactionHistory.create({
                            userId: hostId,
                            payoutId,
                            payoutEmail: hostEmail,
                            amount: singlePayoutAmount,
                            fees,
                            currency,
                            blockId,
                            sessionDate,
                            learnersParticipated: finalGuestCount,
                            listId
                        });

                        singlePayout && singlePayout.length > 0 && singlePayout.map(async(item, value) => {
                            const updateSession = await SessionTime.update({
                                isPayoutCompleted: 1
                            },
                            {
                                where: {
                                    reservationId: item.id,
                                    id: item.sessionId
                                }
                            });
                        });

                    }

                }
                // console.log('status',status, payout);

            })
            );


        }

        // console.log('payyyyyyyy', getReservationIds)

    }, null, true, 'Europe/London');

};

export default payout;