// GrpahQL
import {
  GraphQLString as StringType,
} from 'graphql';

import ChildMutationType from '../../types/ChildMutationType';

// Sequelize models

import { Child } from '../../../data/models';

const CreateChild = {

  type: ChildMutationType,

  args: {

    parentId: { type: StringType },
    firstName: { type: StringType },
    lastName: { type: StringType },
    preferredName: { type: StringType },
    birthday: { type: StringType },
    email: { type: StringType },
    preferences: { type: StringType }

  },

  async resolve({ request }, {
    parentId,
    firstName,
    lastName,
    preferredName,
    birthday,
    email,
    preferences
    }) {

    if(request.user && !request.user.admin) {
      const createChild = await Child.create({
        parentId,
        firstName,
        lastName,
        preferredName,
        birthday,
        email,
        preferences,
      });
      if(createChild){
        return {
          status: 'success'
        }
      }else{
        return {
          status: 'failed'
        }
      }
    }else{
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default CreateChild;
