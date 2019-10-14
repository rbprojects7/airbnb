// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
} from 'graphql';
import sequelize from '../../sequelize';
import ReservationLearningAimType from '../../types/ReservationLearningAimType';
import { ReservationLearningAim } from '../../models';

const getReservationBlockLearningAim = {

    type: new List(ReservationLearningAimType),

    args: {
        blockUniqueId: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { blockUniqueId }) {
        if (request.user) {
            const userId = request.user.id;

            return await ReservationLearningAim.findAll({
                where: {
                    blockUniqueId: blockUniqueId
                },
            });
        } else {
            return {
                status: 'notLoggedIn'
            };
        }
    },
};

export default getReservationBlockLearningAim;

/**
query getReservationBlockLearningAim ($blockUniqueId: Int!){
  getReservationBlockLearningAim(blockUniqueId: $blockUniqueId){
   id
   hostId
   guestId
   reservationId
   listId
   value
   blockId
   blockUniqueId
   
}
}
**/