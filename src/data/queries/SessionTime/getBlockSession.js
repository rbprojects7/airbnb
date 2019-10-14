// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLObjectType as ObjectType,
    GraphQLBoolean as BooleanType,
  } from 'graphql';
import { SessionTimeType } from '../../types/SessionTimeType';
import { SessionTime } from '../../models';

const getBlockSession = {

    type: new List(SessionTimeType),

    args: {
        blockUniqueId: { type: IntType }
    },

    async resolve({ request }, { blockUniqueId }) {
        if (request.user) {
            const userId = request.user.id;

            return await SessionTime.findAll({
                where: {
                    blockUniqueId,
                    reservationId: null
                },
                // order:[['date','ASC']]
            });
        } else {
            return {
                status: 'notLoggedIn'
            };
        }
    },
};

export default getBlockSession;

/**
query getBlockSession ($blockUniqueId: Int!){
  getBlockSession(blockUniqueId: $blockUniqueId){
   id
   date
   startTime
   endTime
   reservationId
   blockUniqueId
  }
}
**/