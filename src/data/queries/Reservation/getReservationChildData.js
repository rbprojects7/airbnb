import ReservationType from '../../types/ReservationType';
import { Reservation } from '../../models';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLList as List
} from 'graphql';

const getReservationChildData = {

    type: new List(ReservationType),

    args: {
        reservationId: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { reservationId }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            return await Reservation.findAll({
                where: {
                    id: reservationId
                }
            });


        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }


};

export default getReservationChildData;

/**
query getReservationChildData ($reservationId: Int!){
  getReservationChildData(reservationId: $reservationId){
   isParentEnable
   childParentData
    {
      id
      userId
      reservationId
      isParent
      childId
      childName
      {
         id
         parentId
         email
         preferredName
         firstName
         lastName
         birthday
         preferences
         childId
      }
    }
  }
}

**/