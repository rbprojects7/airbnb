// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
} from 'graphql';
import sequelize from '../../sequelize';
import ReservationType from '../../types/ReservationType';
import { Reservation } from '../../models';

const pendingBlockReviewsChild = {

    type: new List(ReservationType),

    args: {
        blockUniqueId: { type: new NonNull(IntType) }
    },

    async resolve({request}, {blockUniqueId}) {
        if(request.user) {
            const userId = request.user.id;

          return await Reservation.findAll({
                where: {
                    blockUniqueId: blockUniqueId
                },
            });
            // const reservationData =  await Reservation.findAll({
            //     where: {
            //         blockUniqueId: blockUniqueId
            //     },
            // });
            // let reservationIdList = [];
            // if(reservationData)
            // {
            //     reservationData.map((item, index) => {
            //          reservationIdList.push(item.id);
            //       });
                 
            // }

            // console.log("reservationIdList==",reservationIdList)

            // const reservationBlockChildData =  await Reservation.findAll({
            //     where: {
            //       id: {
            //         $in: [reservationIdList]
            //       }
            //     }
            //   });
          

        } else {
            return {
                status: 'notLoggedIn'
            };
        }
    },
};

export default pendingBlockReviewsChild;

/**
query pendingBlockReviewsChild ($blockUniqueId: Int!){
  pendingBlockReviewsChild(blockUniqueId: $blockUniqueId){
   id
    childParentData
    {
      childId
      childName
      {
        firstName
        lastName
        preferredName
        childId
        email
        birthday
      }
    }
   
}
}
**/