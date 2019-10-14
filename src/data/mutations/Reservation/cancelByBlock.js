// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

//helper
import { isEmpty } from '../../../helpers/isEmptyObject';

import { sendEmail } from '../../../core/email/sendEmail';



// Sequelize models
import { Reservation, ListBlockedDates, CancellationDetails, ThreadItems, SessionTime } from '../../models';

const cancelByBlock = {

    type: ReservationType,

    args: {
        total: { type: FloatType },
        currency: { type: StringType },
        cancelledBy: { type: StringType },
        message: { type: StringType },
        // checkIn: { type: new NonNull(StringType) },
        // checkOut: { type: new NonNull(StringType) },
        // guests: { type: new NonNull(IntType) },
        cancellationData: { type: StringType },
        getReservationId: { type: StringType },
    },

    async resolve({ request, response }, {
        total,
        currency,
        cancelledBy,
        message,
        cancellationData,
        getReservationId
    }) {
        let isReservationUpdated = false;
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            const userId = request.user.id;

            // if (reservationId) {
            //     const count = await Reservation.count({
            //         where: {
            //             id: reservationId,
            //             reservationState: 'cancelled'
            //         }
            //     });

            //     if (count > 0) {
            //         return {
            //             status: '400'
            //         };
            //     }
            // }

            // Update Reservation table
            // const updateReservation = await Reservation.update({
            //   reservationState: 'cancelled'
            // },{
            //   where: {
            //     id: reservationId
            //   }
            // }).then(function(instance){
            //   // Check if any rows are affected
            //   if(instance > 0) {
            //     isReservationUpdated = true;
            //   }
            // });

            // // Unblock the blocked dates only if guest cancels the reservation
            // if(cancelledBy === 'guest'){
            //   const unlockBlockedDates = await ListBlockedDates.destroy({
            //     where: {
            //       reservationId
            //     }
            //   });
            // }

            if (cancelledBy === "host") {
                let cancelledData = [];
                let AllReservationId = JSON.parse(getReservationId);
                let cancellationCode = Math.floor(100000 + Math.random() * 900000);
                let cancellationDetails = JSON.parse(cancellationData);
                if (cancellationDetails != null && cancellationDetails != undefined && cancellationDetails.length > 0) {
                    await Promise.all(cancellationDetails.map(async (item, key) => {
                        if (isEmpty(item)) {
                            let learnerId = item.learnerId;
                            let dates = item.dates;
                            dates.map(async (values, key) => {
                                if (values.isSelected == false && values.isDisabled == false) {
                                    let cancellationRecord = {
                                        reservationId: item.reservationId,
                                        sessionId: values.sessionId,
                                        date: values.date,
                                        learnerId,
                                        groupId: cancellationCode,
                                        cancellationPolicy: 'policy',
                                        total,
                                        currency,
                                        cancelledBy
                                    }
                                    cancelledData.push(cancellationRecord);

                                }
                            })
                        }
                    })
                    );
                }

                const cancelBulkCreate = await CancellationDetails.bulkCreate(cancelledData);

                if (cancelBulkCreate) {
                    isReservationUpdated = true;
                }

                // console.log('asxasdasdasd', AllReservationId)


                let reservationMailData = [];
                if (cancelBulkCreate && AllReservationId && AllReservationId.length > 0) {
                    await Promise.all(AllReservationId.map(async (item, index) => {
                        let singleReservationData = {};
                        let singleMailContent = [];
                        let guests= item.guests;

                        // const reservationStatus = await Reservation.findOne({
                        //     where: {
                        //         id: item.reservationId
                        //     }
                        // });

                        // if(reservationStatus.reservationState != 'cancelled') {

                        const sessionCount = await SessionTime.count({
                            where: {
                                reservationId: item.reservationId
                            }
                        });


                       const createThread = await ThreadItems.create({
                            threadId: item.threadId,
                            reservationId: item.reservationId,
                            sentBy: userId,
                            content: message,
                            type: 'message',
                            startDate: item.checkIn,
                            endDate: item.checkOut,
                            personCapacity: item.guests,
                            cancellationGroupId: cancellationCode
                        });

                        let expectedCancellation = sessionCount * guests;

                        const cancellationTillNow = await CancellationDetails.count({
                            where: {
                                reservationId: item.reservationId
                            }
                        });

                        // console.log('w23141234', cancellationTillNow, expectedCancellation)

                        if (cancellationTillNow == expectedCancellation) {
                            // Update Reservation table
                            const updateReservation = await Reservation.update({
                                reservationState: 'cancelled'
                            }, {
                                    where: {
                                        id: item.reservationId,
                                    }
                                });

                            // Create thread items
                            const thread = await ThreadItems.create({
                                threadId: item.threadId,
                                reservationId: item.reservationId,
                                sentBy: userId,
                                content: null,
                                type: cancelledBy === 'host' ? 'cancelledByHost' : 'cancelledByGuest',
                                startDate: item.checkIn,
                                endDate: item.checkOut,
                                personCapacity: item.guests
                            });
                        }
                        // }
                        singleReservationData['reservationId'] = item.reservationId;
                        singleReservationData['guestName'] = item.guestFirstName;
                        // singleReservationData['guestLastName'] = item.guestLastName;
                        singleReservationData['guestMailId'] = item.guestMailId;
                        singleReservationData['hostName'] = item.hostFirstName;
                        // singleReservationData['hostLastName'] = item.hostLastName;
                        singleReservationData['listTitle'] = item.title;
                        singleReservationData['cancelledDate'] = item.cancelledDate;
                        singleReservationData['message'] = message;


                        cancellationDetails && cancellationDetails.map((value, index) => {
                            if (item.reservationId == value.reservationId) {
                                // console.log('vall123123',value);
                                let mailContent = {
                                    firstName: value.firstName,
                                    lastName: value.lastName,
                                    learnerId: value.learnerId,
                                    dates: value.dates,
                                }
                                singleMailContent.push(mailContent);
                                singleReservationData['cancellation'] = singleMailContent;
                            }

                        });
                        reservationMailData.push(singleReservationData);
                    })
                    );
                    console.log('mailContent', reservationMailData)
                    if(reservationMailData && reservationMailData.length > 0) {
                   await Promise.all(reservationMailData.map(async(item,index) => {
                       await sendEmail(item.guestMailId, 'cancelledByHost', item);
                    })
                   );
                }

                }




            }
            // Create record for cancellation details
            // const cancellation = CancellationDetails.create({
            //   reservationId,
            //   cancellationPolicy,
            //   refundToGuest,
            //   payoutToHost, 
            //   guestServiceFee, 
            //   hostServiceFee, 
            //   total, 
            //   currency,
            //   cancelledBy
            // });

            // // Create thread items
            // const thread = ThreadItems.create({
            //   threadId,
            //   reservationId,
            //   sentBy: userId,
            //   content: message,
            //   type: cancelledBy === 'host' ? 'cancelledByHost' : 'cancelledByGuest',
            //   startDate: checkIn,
            //   endDate: checkOut,
            //   personCapacity: guests
            // });

            if (isReservationUpdated) {
                return {
                    status: '200'
                }
            } else {
                return {
                    status: '400'
                }
            }

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    },
};

export default cancelByBlock;

/**
mutation cancelReservation(
  $reservationId: Int!,
  $cancellationPolicy: String!,
  $refundToGuest: Float!,
  $payoutToHost: Float!,
  $guestServiceFee: Float!,
  $hostServiceFee: Float!,
  $total: FloatType!,
  $currency: String!,
  $threadId: Int!,
  $cancelledBy: String!,
  $message: String!
){
    cancelReservation(
      reservationId: $reservationId,
      cancellationPolicy: $cancellationPolicy,
      refundToGuest: $refundToGuest,
      payoutToHost: $payoutToHost,
      guestServiceFee: $guestServiceFee,
      hostServiceFee: $hostServiceFee,
      total: $total,
      currency: $currency,
      threadId: $threadId,
      cancelledBy: $cancelledBy,
      message: $message
    ) {
        status
    }
}
**/
