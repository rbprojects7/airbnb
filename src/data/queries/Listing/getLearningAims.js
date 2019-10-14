// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import LearningAimType from '../../types/learningAimType';
import { LearningAim } from '../../models';

const getLearningAims = {

    type: new List(LearningAimType),

    args: {
        listId: { type: new NonNull(IntType) },
    },
    async resolve({ request }, { listId }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            return await LearningAim.findAll({
                where: { listId }
            });

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getLearningAims;

/**
query GetLearningAims($listId: Int!) {
  getLearningAims(listId: $listId) {
    id
    listId
    value
    learningAimId
  }
}
 */
