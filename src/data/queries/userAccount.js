import UserAccountType from '../types/userAccountType';
import { User, UserLogin, UserClaim, UserProfile } from '../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const userAccount = {

  type: UserAccountType,

  async resolve({ request, response }) {

      if(request.user && request.user.admin != true) {

      //Collect from Logged-in User
      let loggedInId = request.user.id;
      let loggedInEmail = request.user.email;

      /*return await UserProfile.findOne({
        where: { userId: loggedInId }
      });*/

      // Get All User Profile Data
      const userProfile = await UserProfile.find({
        attributes: [
          'profileId',
          'firstName',
          'lastName',
          'displayName',
          'dateOfBirth',
          'gender',
          'phoneNumber',
          'preferredLanguage',
          'preferredCurrency',
          'location',
          'info',
          'createdAt',
          'picture',
          'homeTown',
          'isBookingAllowed',
          'isNewsLetterAccepted',
          'iamOverEighteen',
          'postCode',
        ],
        where: { userId: request.user.id},
      });

      if(userProfile) {

        return {
          userId: request.user.id,
          profileId: userProfile.dataValues.profileId,
          firstName: userProfile.dataValues.firstName,
          lastName: userProfile.dataValues.lastName,
          displayName: userProfile.dataValues.displayName,
          gender: userProfile.dataValues.gender,
          dateOfBirth: userProfile.dataValues.dateOfBirth,
          email: request.user.email,
          phoneNumber: userProfile.dataValues.phoneNumber,
          preferredLanguage: userProfile.dataValues.preferredLanguage,
          preferredCurrency: userProfile.dataValues.preferredCurrency,
          location: userProfile.dataValues.location,
          info: userProfile.dataValues.info,
          homeTown: userProfile.dataValues.homeTown,
          createdAt: userProfile.dataValues.createdAt,
          picture: userProfile.dataValues.picture,
          isBookingAllowed: userProfile.dataValues.isBookingAllowed,
          isNewsLetterAccepted: userProfile.dataValues.isNewsLetterAccepted,
          iamOverEighteen: userProfile.dataValues.iamOverEighteen,
          postCode: userProfile.dataValues.postCode,
          status: "success"
        }

      }
    } else {
      return {
        status: "notLoggedIn"
      }
    }
  },
};

export default userAccount;
