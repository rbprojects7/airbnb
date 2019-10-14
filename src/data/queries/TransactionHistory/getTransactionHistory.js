import AllTransactionHistoryType from '../../types/AllTransactionHistoryType';
import { Reservation, TransactionHistory } from '../../models';
import sequelize from '../../sequelize';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType
} from 'graphql';

const getTransactionHistory = {

    type: AllTransactionHistoryType,

    args: {
        mode: { type: StringType },
        payoutId: { type: IntType },
        listId: { type: IntType },
        currentPage: { type: IntType },
    },

    async resolve({ request }, { mode, payoutId, listId, currentPage }) {
        const limit = 5;
        let offset = 0;
        // Offset from Current Page
        if (currentPage) {
            offset = (currentPage - 1) * limit;
        }
        if (request.user && !request.user.admin) {
            const userId = request.user.id;
            // let include, reservationRule, transactionRule;
            // reservationRule = {
            //     hostId: userId,
            //     paymentState: 'completed',
            //     reservationState: 'approved'
            // };
            // let id = {
            //       $notIn: [
            //         sequelize.literal("SELECT reservationId FROM TransactionHistory")
            //       ]
            //     };

            // if(listId && listId > 0){
            //     reservationRule = {
            //         hostId: userId,
            //         paymentState: 'completed',
            //         reservationState: 'approved',
            //         listId
            //     };
            // }

            // if(payoutId && payoutId > 0){
            //     transactionRule = {
            //         payoutId
            //     }
            // }

            // if(mode === 'completed' || mode === 'grossEarnings'){
            //     include = [
            //         {
            //           model: TransactionHistory, 
            //           as: 'transactionHistory',
            //           required: true,
            //           where: transactionRule
            //         }
            //     ];
            //     let reservationState = 'completed';
            //     reservationRule = Object.assign({}, reservationRule, {reservationState});
            // } else {
            //     reservationRule = Object.assign({}, reservationRule, {id});
            // }

            // const count = await Reservation.count({
            //     where: reservationRule,
            //     include,
            //     order: [['checkIn', 'DESC']],
            //     limit: limit,
            //     offset: offset,  
            // });

            // const reservationData = await Reservation.findAll({
            //     where: reservationRule,
            //     include,
            //     order: [['checkIn', 'DESC']],
            //     limit: limit,
            //     offset: offset,  
            // });

            let reservationRule, transactionRule, where, count, transactionHistoryData;

            reservationRule = {
                userId,
            }

            if (listId && listId > 0) {
                reservationRule = {
                    userId,
                    listId
                };
            }

            if (payoutId && payoutId > 0) {
                transactionRule = {
                    payoutId
                }
            }

            where = Object.assign({}, reservationRule, transactionRule);


            if (mode === 'completed') {

                count = await TransactionHistory.count({
                    where: where,
                    order: [['createdAt', 'DESC']],
                    limit: limit,
                    offset: offset,
                });

                transactionHistoryData = await TransactionHistory.findAll({
                    where: where,
                    order: [['createdAt', 'DESC']],
                    limit: limit,
                    offset: offset,
                });

            }

            return {
                transactionHistoryData,
                count,
                status: 'success'
            }

        } else {
            return {
                status: 'notLoggedIn',
            };
        }
    }
};

export default getTransactionHistory;

/**
query getTransactionHistory ($mode: String, $payoutId: Int, $listId: Int){
  getTransactionHistory(mode: $mode, payoutId: $payoutId, listId: $listId){
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
    total
    listData {
      id
      title
      street
      city
      state
      country
    }
    hostTransaction {
      id
      amount
      currency
    }
    hostPayout {
      id
      payEmail
    }
    hostData {
      profileId
      displayName
      picture
    }
    guestData {
      profileId
      displayName
      picture
    }
  }
}

**/