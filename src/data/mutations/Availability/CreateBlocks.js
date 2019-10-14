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

import {Block} from '../../../data/models';
// Types
import {BlockInputType, BlockType} from '../../types/BlockType'

const CreateBlocks = {

  type: new List(BlockType),

  args: {
    blockList: {type: new List(BlockInputType)},
  },

  async resolve({request, response}, {
    blockList,
  }) {

    // Check if user already logged in
    if (request.user || request.user.admin) {
      // await Block.destroy({
      //   where:{
      //     listId: blockList[0].listId
      //   }
      // });
      const promises = [];
      for (let block of blockList) {
        let blockId = block.id;
        if (blockId){
         await promises.push(Block.findOne({
            where: {
              id: blockId,
            },
          }))
        } else {
       await promises.push(Block.create(block))
        }
      }
      const response = await Promise.all(promises);

      if (response) {
        return response;
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

export default CreateBlocks;

/**
 mutation CreateBlocks(
 $blockList: [BlockInputType]!,
 ){
    CreateBlocks(
      blockList: $blockList,
    ) {
      id,
    	listId,
    	price
    }
}
 **/
