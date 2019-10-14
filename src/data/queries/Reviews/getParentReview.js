// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
} from 'graphql';

import ReviewsType from '../../types/ReviewsType';

// Sequelize models
import { Reviews, UserProfile } from '../../models';

const getParentReview = {

    type: new List(ReviewsType),

    args: {
        reservationId: { type: IntType },
    },

    async resolve({ request }, { reservationId }) {
        if (request.user) {
            const userId = request.user.id;

            return await Reviews.findAll({
                where: {
                    reservationId
                },
            });
        } else {
            return {
                status: 'notLoggedIn'
            };
        }
    },
};

export default getParentReview;

/**
query getParentReview($reservationId: Int){
    getParentReview(reservationId: $reservationId){
        id
        reservationId
        listId
        authorId
        userId
        reviewContent
        rating
        parentId
        automated
        createdAt
        status
    	response {
          id
          reservationId
          listId
          authorId
          userId
          reviewContent
          rating
          parentId
          automated
          createdAt
          status
        }
    }
}
**/