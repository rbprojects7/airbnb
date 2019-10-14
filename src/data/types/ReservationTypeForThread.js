import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
    GraphQLList as List,

} from 'graphql';

// Models
import {Listing, UserProfile, Threads, Payout, TransactionHistory, 
    Transaction, CancellationDetails,User, SessionTime, Reservation} from '../models';

import moment from 'moment';

// Type
import ThreadsType from './ThreadsType';
import ShowListingType from './ShowListingType';
import ProfileType from './ProfileType';
import PayoutType from './PayoutType';
import TransactionHistoryType from './TransactionHistoryType';
import TransactionType from './TransactionType';
import CancellationDetailsType from './CancellationDetailsType';
import UserType from './UserType';
import { SessionTimeType } from './SessionTimeType';

const ReservationTypeForThread = new ObjectType({
    name: 'ReservationThread',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        hostId: {
            type: StringType
        },
        
        guestId: {
            type: StringType
        },
        checkIn: {
            type: StringType
        },
        checkOut: {
            type: StringType
        },
        guests: {
            type: IntType
        },
        message: {
            type: StringType
        },
        basePrice: {
            type: FloatType
        },
        cleaningPrice: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        discount: {
            type: FloatType
        },
        discountType: {
            type: StringType
        },
        guestServiceFee: {
            type: FloatType,
        },
        hostServiceFee: {
            type: FloatType,
        },
        total: {
            type: FloatType,
        },
        confirmationCode: {
            type: IntType
        },
        reservationState: {
            type: StringType
        },
        paymentState: {
            type: StringType
        },
        payoutId: {
            type: IntType
         },
       
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        count: {
            type: IntType
        },
        status: {
            type: StringType
        },
        paymentMethodId: {
            type: IntType
        },
        
        chosenBlockData: {
            type: new List(SessionTimeType),
            async resolve(reservation) {
               return await SessionTime.findAll({
                    where: {
                        reservationId: reservation.id        
                    },
                });
            }
        },
        
    }
});

export default ReservationTypeForThread;