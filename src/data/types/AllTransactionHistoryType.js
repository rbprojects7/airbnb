import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

import TransactionHistoryType from './TransactionHistoryType';

const AllTransactionHistoryType = new ObjectType({
	name: 'AllTransactionHistory',
	fields: {
		transactionHistoryData: {
			type: new List(TransactionHistoryType)
		},
		count: {
			type: IntType
		},
		status: {
			type: StringType
		}
	}
});

export default AllTransactionHistoryType;