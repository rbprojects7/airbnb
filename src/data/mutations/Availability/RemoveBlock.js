// GrpahQL
import {
    GraphQLInt as IntType,
    GraphQLObjectType as ObjectType,
    GraphQLInputObjectType,
    GraphQLString as StringType,
    GraphQLID as IdType,
    GraphQLNonNull as NonNull,
    GraphQLList as List
} from 'graphql';// Sequelize models

import { Block } from '../../../data/models';
// Types
import { BlockInputType, BlockType } from '../../types/BlockType'

const RemoveBlock = {

    type: BlockType,

    args: {
        blockId: { type: StringType },
    },

    async resolve({ request, response }, {
        blockId,
    }) {

        // Check if user already logged in
        if (request.user) {
           
            const response = await Block.destroy({
                where: {
                    id: blockId
                }
            });

            if (response) {
                return {
                    status: 'success'
                };
            } else {
                return {
                    status: 'failed to create Block'
                }
            }
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    },
};

export default RemoveBlock;


