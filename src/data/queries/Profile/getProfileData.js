// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ShowUserProfileType from '../../types/ShowUserProfileType';
import { UserProfile } from '../../models';

const getProfileData = {

    type: new List(ShowUserProfileType),

    args: {
        userId: { type: StringType },
    },

    async resolve({ request }, { userId }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {
             let userIdValue = userId  || userId==null ? userId : "";
             return await UserProfile.findAll({
                where: { userId: userIdValue }
            });

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getProfileData;

/**
query getProfileData($userId: String!) {
  getProfileData(userId: $userId) {
    userId
    profileId
    firstName
    lastName
    dateOfBirth
    picture
    gender
    phoneNumber
    preferredLanguage
    preferredCurrency
    info
    location
  }
}
 */