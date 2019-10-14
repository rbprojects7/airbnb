// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ShowListingType from '../../types/ShowListingType';
import { Listing } from '../../models';

const getBlockListMeta = {

    type: ShowListingType,

    args: {
        listId: { type: IntType },
    },

    async resolve({ request }, { listId }) {
        let listIdValue = listId ? listId : 0;
        return await Listing.findOne({
            where: { id: listIdValue }
        });
    }
};

export default getBlockListMeta;

/**
query getBlockListMeta($listId: Int) {
  getBlockListMeta(listId: $listId) {
    id
    title
    description
    city
    state
    coverPhoto
    listPhotos
    {
      id
      name
    }
    isListOwner
    user
    {
      email
      profile {
        profileId
        firstName
        lastName
        displayName
        dateOfBirth
        picture
        location
        info
        homeTown
        createdAt
      }
    }
  }
}
 */