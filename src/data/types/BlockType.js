import {SessionTime} from "../models";
import {SessionTimeType} from "./SessionTimeType";
import sequelize from '../sequelize';

import {
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLInputObjectType,
  GraphQLString as StringType,
  GraphQLID as IdType,
  GraphQLNonNull as NonNull,
  GraphQLList as List
} from 'graphql';


const BlockType = new ObjectType({
  name: 'BlockType',
  fields: {
    id: {type: new NonNull(IdType)},
    listId: {type: IntType},
    price: {type: StringType},
    blockUniqueId: { type: new NonNull(IdType) },
    blockState: { type: StringType },
    status: {type: StringType},
    // sessionTime: {
    //   type: SessionTimeType,
    //   resolve(blockId) {
    //     return SessionTime.findAll(
    //       {
    //         where: {
    //           blockId
    //         }
    //       });
    //   }
    // }
  }
});

const BlockLisitingType = new ObjectType({
  name: 'BlockLisitingType',
  fields: {
    id: {type: new NonNull(IdType)},
    listId: {type: IntType},
    price: {type: StringType},
    blockUniqueId: { type: new NonNull(IdType) },
    sessionTime: {
      type: new List(SessionTimeType),
      async resolve(block) {
        const response = await SessionTime.findAll(
          {
            where: {
              blockId: block.id
            },
            // order: [['date', 'ASC']]
          });
        return response;
      }
    }
  }
});

const BlockInputType = new GraphQLInputObjectType({
  name: 'BlockInputType',
  fields: {
    price: {type: StringType},
    id: {type: IdType},
    listId: {type: IntType},
    blockUniqueId: { type: IdType }
  }
});

export { BlockType, BlockInputType, BlockLisitingType };
