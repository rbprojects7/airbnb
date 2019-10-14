// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import { Reservation, SessionTime, ParentChild, Child, ReservationLearningAim, LearningAim, Block } from '../../models';

const createReservation = {

  type: ReservationType,

  args: {
    listId: { type: new NonNull(IntType) },
    hostId: { type: new NonNull(StringType) },
    guestId: { type: new NonNull(StringType) },
    checkIn: { type: StringType },
    checkOut: { type: StringType },
    guests: { type: IntType },
    message: { type: new NonNull(StringType) },
    basePrice: { type: new NonNull(FloatType) },
    cleaningPrice: { type: FloatType },
    currency: { type: new NonNull(StringType) },
    discount: { type: FloatType },
    discountType: { type: StringType },
    guestServiceFee: { type: FloatType },
    hostServiceFee: { type: FloatType },
    total: { type: new NonNull(FloatType) },
    bookingType: { type: StringType },
    paymentType: { type: IntType },
    chosenBlockData: { type: StringType },
    isParent: { type: BooleanType },
    child: { type: new List(StringType) },
    childParentData: { type: StringType },
    startTime: { type: StringType },
    endTime: { type: StringType },
    learningAimId: { type: IntType },
    value: { type: StringType },
    blockId: { type: StringType },
    blockUniqueId: { type: IntType },
    totalSessionHours: { type: FloatType },
  },

  async resolve({ request, response }, {
    listId,
    hostId,
    guestId,
    checkIn,
    checkOut,
    guests,
    message,
    basePrice,
    cleaningPrice,
    currency,
    discount,
    discountType,
    guestServiceFee,
    hostServiceFee,
    total,
    bookingType,
    paymentType,
    chosenBlockData,
    isParent,
    child,
    childParentData,
    startTime,
    endTime,
    blockId,
    blockUniqueId,
    totalSessionHours
  }) {

    // Check if user already logged in
    if (request.user && !request.user.admin) {
      const userId = request.user.id;
      let confirmationCode = Math.floor(100000 + Math.random() * 900000);
      let convertchosenBlock;
      convertchosenBlock = JSON.parse(chosenBlockData);
      let reservationState;
      if (bookingType === 'instant') {
        reservationState = 'approved';
      }
      const reservation = await Reservation.create({
        listId,
        hostId,
        guestId,
        checkIn,
        checkOut,
        guests,
        message,
        basePrice,
        cleaningPrice,
        currency,
        discount,
        discountType,
        guestServiceFee,
        hostServiceFee,
        total,
        confirmationCode,
        reservationState,
        paymentMethodId: paymentType,
        isParentEnable: isParent,
        startTime,
        endTime,
        blockId,
        blockUniqueId,
        totalSessionHours
      });

      if (reservation) {
        if (convertchosenBlock && convertchosenBlock.length > 0) {
          convertchosenBlock.map(async (item, key) => {
            let updatechosenBlock = await SessionTime.create({
              reservationId: reservation.id,
              date: item.date,
              startTime: item.startTime,
              endTime: item.endTime,
              blockUniqueId: item.blockUniqueId

            });
          });
        }
        if (isParent) {
          let updateParentChild = await ParentChild.create({
            reservationId: reservation.id,
            userId,
            isParent,
            blockUniqueId: reservation.blockUniqueId
          })
        }
        if (child && child.length > 0) {
          child.map(async (item, key) => {
            let updateChild = await ParentChild.create({
              reservationId: reservation.id,
              userId,
              // isParent: reservation.isParent,
              childId: item,
              blockUniqueId: reservation.blockUniqueId
            })
          })

        }

        //Check whether blockId is booked in Reservation
        // const isReservationBlockIdAvailable = await Block.findOne({ blockUniqueId: reservation.blockUniqueId });
        // if (isReservationBlockIdAvailable) {
        //   const updateBlockState = await Block.update({
        //     blockState : 'booked'
        //   }, {
        //     where: {
        //       blockUniqueId : reservation.blockUniqueId
        //     }
        //   });
        // }

        const isReservationBlockIdAvailable = await Block.count({ where: { blockUniqueId: reservation.blockUniqueId } });
        //console.log("isReservationBlockIdAvailable====",isReservationBlockIdAvailable);
        if (isReservationBlockIdAvailable > 0) {
          const updateBlockState = await Block.update({
            blockState : 'booked'
          }, {
            where: {
              blockUniqueId : reservation.blockUniqueId
            }
          });
        }



        // Check whether blockId is available
        // const isBlockIdAvailable = await ReservationLearningAim.findAll({ blockUniqueId: reservation.blockUniqueId });

        const isBlockIdAvailable = await ReservationLearningAim.count({ where: { blockUniqueId: reservation.blockUniqueId } });

        if (isBlockIdAvailable == 0) {
         
          // Collect LearningAim for that list                
          const reservationLearningAim = await LearningAim.findAll({
            where: {
              listId: reservation.listId
            }
          });

          if (reservationLearningAim && reservationLearningAim.length > 0) {
            reservationLearningAim.map(async (item) => {
              //create ReservationLearningAims
              let createReservationLearningAim = await ReservationLearningAim.create({
                hostId: reservation.hostId,
                guestId: reservation.guestId,
                reservationId: reservation.id,
                listId: reservation.listId,
                value: item.value,
                blockId: reservation.blockId,
                blockUniqueId: reservation.blockUniqueId
              });
            })
          }

        }


        return reservation;
      }
      else {
        return {
          status: 'failed to create a reservation'
        }
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default createReservation;

/**
mutation createReservation(
  $listId: Int!, 
  $hostId: String!,
  $guestId: String!,
  $checkIn: String!,
  $checkOut: String!,
  $guests: Int!,
  $message: String!,
  $basePrice: Float!,
  $cleaningPrice: Float!,
  $currency: String!,
  $discount: Float,
  $discountType: String,
  $guestServiceFee: Float,
  $hostServiceFee: Float,
  $total: Float!,
  $bookingType: String
){
    createReservation(
      listId: $listId,
      hostId: $hostId,
      guestId: $guestId,
      checkIn: $checkIn,
      checkOut: $checkOut,
      guests: $guests,
      message: $message,
      basePrice: $basePrice,
      cleaningPrice: $cleaningPrice,
      currency: $currency,
      discount: $discount,
      discountType: $discountType,
      guestServiceFee: $guestServiceFee,
      hostServiceFee: $hostServiceFee,
      total: $total,
      bookingType: $bookingType
    ) {
        id
        listId,
        hostId,
        guestId,
        checkIn,
        checkOut,
        guests,
        message,
        basePrice,
        cleaningPrice,
        currency,
        discount,
        discountType,
        guestServiceFee,
        hostServiceFee,
        total,
        confirmationCode,
        createdAt
        status
    }
}
**/
