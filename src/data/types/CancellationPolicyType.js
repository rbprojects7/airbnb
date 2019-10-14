import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

import { Cancellation } from '../models';
import cancellationType from './CancellationType';

const CancellationPolicyType = new ObjectType({
    name: 'CancellationPolicy',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        cancellationType: {
            type: IntType
        },
        isEnable: {
            type: BooleanType
        },
        policy:{
            type: cancellationType,
            resolve(CancellationPolicy) {
                return Cancellation.findOne({
                    where: { id: CancellationPolicy.cancellationType}
                })
            }
        }
    }
});

export default CancellationPolicyType;