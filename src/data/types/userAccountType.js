import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import UserVerifiedInfoType from './UserVerifiedInfoType';
import UserType from './UserType';
import PayoutType from './PayoutType';

import { UserVerifiedInfo, User, Payout } from '../models';


const UserAccountType = new ObjectType({
  name: 'UserAccount',
  fields: {
    userId: { type: new NonNull(ID) },
    profileId: { type: new NonNull(IntType) },
    firstName: { type: StringType },
    lastName: { type: StringType },
    displayName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    email: { type: StringType },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    homeTown: { type: StringType },
    createdAt: { type: StringType },
    status: {type: StringType},
    picture: {type: StringType},
    verification: {
      type: UserVerifiedInfoType,
      async resolve (userProfile) {
        return await UserVerifiedInfo.findOne({ where: { userId: userProfile.userId }});
      }
    },
    userData: {
      type: UserType,
      async resolve (userProfile) {
        return await User.findOne({ where: { id: userProfile.userId }});
      }
    },
    payout: {
      type: PayoutType,
      async resolve (userProfile) {
        return await Payout.findOne({ where: { userId: userProfile.userId }});
      }
    },
    isBookingAllowed: {
      type: BooleanType
    },
    
    isNewsLetterAccepted: {
      type: StringType
    },

    iamOverEighteen: {
      type: BooleanType
    },
    
    postCode: {
      type: StringType
    },
  },
});

export default UserAccountType;
