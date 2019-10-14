import BlockByReservationType from '../../types/BlockByReservationType';
import { Block } from '../../../data/models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const getSingleBlock = {

    type: BlockByReservationType,

    args: {
        blockId: { type: IntType }
    },

    async resolve({ request }, { blockId }) {

        return await Block.findOne({
            where: {
                blockUniqueId: blockId
            }
        });
    },
};

export default getSingleBlock;
