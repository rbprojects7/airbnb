// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import StarLearningType from '../../types/StarLearningType';
import { StarListing } from '../../models';

const getStarListing = {

    type: new List(StarLearningType),

    args: {
        listId: { type: new NonNull(IntType) },
    },
    async resolve({ request }, { listId }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {

            return await StarListing.findAll({
                where: { listId }
            });

        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getStarListing;

/**
query GetStarListing($listId: Int!) {
  getStarListing(listId: $listId) {
    id
    listId
    verbalDescription
    logicDescription
    visualDescription
    musicalDescription
    bodyDescription
    peopleDescription
    innerDescription
    nauralisticDescription
  }
}
 */
