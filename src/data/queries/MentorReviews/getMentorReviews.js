// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { MentorReviews, UserProfile, Child } from '../../models';
import MentorReviewsType from '../../types/MentorReviewsType';

const getMentorReviews = {
    type: new List(MentorReviewsType),

    args: {
        blockUniqueId: { type: new NonNull(IntType) },
        listId: { type: IntType },
        parentId: { type: StringType },
        childId: { type: IntType },
        reservationId: { type: IntType },
        isParentEnable: { type: BooleanType }
    },

    async resolve({ request }, { blockUniqueId, listId, parentId, childId, reservationId, isParentEnable }) {
        if (request.user) {
            let parentIdValue = parentId ? parentId : null;
            let childIdValue = childId ? childId : null;
            let where = {
                blockUniqueId,
                listId,
                parentId: parentIdValue,
                childId: childIdValue,
                reservationId,
                isParentEnable
            };


            const getAllData = await MentorReviews.findAll({
                where,
                order: [['mentorReviewId', 'ASC']]
            });

            return getAllData;

        } else {
            return {
                status: 'notLoggedIn'
            };
        }
    },
};

export default getMentorReviews;

/**
query getMentorReviews ($blockUniqueId: Int!, $listId: Int, $parentId: String, $childId: Int, $reservationId: Int, isParentEnable: Boolean){
  getMentorReviews(blockUniqueId: $blockUniqueId, listId: $listId, parentId: $parentId, childId: $childId, reservationId:$reservationId, isParentEnable: $isParentEnable){
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
   
}
}
**/