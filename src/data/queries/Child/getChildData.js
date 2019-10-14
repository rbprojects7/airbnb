// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ChildType from '../../types/ChildType';
import { Child } from '../../models';

const getChildData = {

    type: new List(ChildType),

    args: {
        childId: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { childId }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            return await Child.findAll({
                where: { childId }
            });

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getChildData;

/**
query getChildData($childId: Int!) {
  getChildData(childId: $childId) {
    id
    parentId
    email
    preferredName
    firstName
    lastName
    birthday
    preferences
    childId
  }
}
 */