import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
    GraphQLList as List,
} from 'graphql';
import { MentorReviews, UserProfile, Child } from '../models';
import ProfileType from './ProfileType';
import ChildType from './ChildType';
import AdminListingType from './siteadmin/AdminListingType';

const MentorReviewsType = new ObjectType({
    name: 'MentorReviews',
    fields: {
        mentorReviewId: {
            type: IntType
        },
        blockId: {
            type: StringType
        },
        blockUniqueId: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        mentorId: {
            type: StringType
        },
        parentId: {
            type: StringType
        },
        childId: {
            type: IntType
        },
        reservationlearningId: {
            type: IntType
        },
        learningAimReviewRating: {
            type: IntType
        },
        learningAimsReviewContent: {
            type: StringType
        },
        isParentEnable: {
            type: BooleanType,
        },
        isReviewed: {
            type: BooleanType
        },
        listData: {
            type: AdminListingType,
            resolve(reviews) {
                return Listing.findOne({
                    where: { id: reviews.listId }
                })
            }
        },
        mentorData: {
            type: ProfileType,
            resolve(reviews){
               return UserProfile.findOne({
                    where: { userId: reviews.mentorId }
                });
            }
        },
        parentData: {
            type: ProfileType,
            resolve(reviews){
               return UserProfile.findOne({
                    where: { userId: reviews.parentId }
                });
            }
        },
        childData: {
            type: ChildType,
            resolve(reviews){
                return Child.findOne({
                     where: { childId: reviews.childId }
                 });
             }
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});
export default MentorReviewsType;