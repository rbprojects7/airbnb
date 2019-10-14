import ChildMutationType from '../../types/ChildMutationType';
import { Child } from '../../models';

import {
  GraphQLString as StringType,
} from 'graphql';

const UpdateChild = {

  type: ChildMutationType,

  args: {

    firstName: { type: StringType },
    lastName: { type: StringType },
    preferredName: { type: StringType },
    birthday: { type: StringType },
    email: { type: StringType },
    preferences: { type: StringType },
    id: { type: StringType }

  },

  async resolve({ request }, {
      firstName,
      lastName,
      preferredName,
      birthday,
      email,
      preferences,
      id
    }) {

    // Check whether user is logged in
    if (request.user || request.user.admin) {
      const updateChild = await Child.update({
        firstName,
        lastName,
        preferredName,
        birthday,
        email,
        preferences
      }, {
        where: {
          id
        }
      });

      if (updateChild) {
        return {
          status: "success"
        };
      } else {
        return {
          status: "failed"
        };
      }
    } else {
      return {
        status: "NotLoggedIn"
      };
    }

  },
};

export default UpdateChild;
