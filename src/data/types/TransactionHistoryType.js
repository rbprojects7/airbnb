import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
} from 'graphql';

const TransactionHistoryType = new ObjectType({
    name: 'TransactionHistory',
    fields: {
        id: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        payoutId: {
            type: IntType
        },
        payoutEmail: {
            type: StringType
        },
        amount: {
            type: FloatType
        },
        fees: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        blockId: {
            type: StringType,
        },
    
        sessionDate: {
            type: StringType,
        },
    
        learnersParticipated: {
            type: IntType,
        },

        listId: {
            type: IntType
        },

        userId: {
            type: StringType
        },
    }
});

export default TransactionHistoryType;