import BlockByReservationType from '../../types/BlockByReservationType';
import { Block } from '../../../data/models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const getBlockByReservation = {

    type: new List(BlockByReservationType),

    args: {
        listId: { type:IntType}
    },

    async resolve({ request },{ listId }) {

        return await Block.findAll({
            where: {
                listId
            }
        });

    },
};

export default getBlockByReservation;
