// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationLearningAimType from '../../types/ReservationLearningAimType';
import { ReservationLearningAim } from '../../models';

const getReservationLearningAim = {

    type: new List(ReservationLearningAimType),

    args: {
        reservationId: { type: new NonNull(IntType) },
    },
    async resolve({ request }, { reservationId }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            return await ReservationLearningAim.findAll({
                where: { reservationId }
            });

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getReservationLearningAim;

/**
query getReservationLearningAim($reservationId: Int!) {
  getReservationLearningAim(reservationId: $reservationId) {
    id
    hostId
    guestId
    reservationId
    listId
    learningAimId
    value
  }
}
 */
