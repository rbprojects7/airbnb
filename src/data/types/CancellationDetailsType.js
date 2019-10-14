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
import { SessionTimeType } from './SessionTimeType';
import { SessionTime, Child } from '../models';
import ChildType from './ChildType';

const CancellationDetailsType = new ObjectType({
    name: 'CancellationDetails',
    fields: {
        id: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        cancellationPolicy: {
            type: StringType
        },
        refundToGuest: {
            type: FloatType
        },
        payoutToHost: {
            type: FloatType
        },
        guestServiceFee: {
            type: FloatType
        },
        hostServiceFee: {
            type: FloatType
        },
        total: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        status: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        sessionId: {
            type: StringType,
        },
        learnerId: {
            type: StringType,
        },
        groupId: {
            type: StringType,
        },
        blockId: {
            type: StringType,
        },
        isRefunded: {
            type: IntType,
        },
        date: {
            type: StringType,
        },
        sessionTime: {
            type:SessionTimeType,
            async resolve(CancellationDetails) {
               return await SessionTime.findOne({
                    where: {
                        id: CancellationDetails.sessionId
                    }
                });
            }
        },
        learnerData: {
            type: ChildType,
            async resolve(CancellationDetails) {
                return await Child.findOne({
                    where: {
                        id: CancellationDetails.learnerId
                    }
                });
            }
        }
    }
});

export default CancellationDetailsType;