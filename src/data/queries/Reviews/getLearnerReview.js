// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType,

} from 'graphql';

import MentorReviewsType from '../../types/MentorReviewsType';

// Sequelize models
import { MentorReviews, UserProfile, Child } from '../../models';

const getLearnerReview = {

    type: new List(MentorReviewsType),

    args: {
        reservationId: { type: IntType },
    },

    async resolve({ request }, { reservationId }) {
        if (request.user) {        
            return await MentorReviews.findAll({
                where: {
                    reservationId,
                },
            });
        } else {
            return {
                status: 'notLoggedIn'
            };
        }
    },
};

export default getLearnerReview;

/**
query getLearnerReview($reservationId: Int){
    getLearnerReview(reservationId: $reservationId){
        mentorReviewId
        blockId
        blockUniqueId
        reservationId
        listId
        mentorId
        parentId
        childId
        reservationlearningId
        learningAimReviewRating
        learningAimsReviewContent
        isParentEnable
        createdAt
        updatedAt
        isReviewed
    }
}
**/