import ShowListingType from '../../types/ShowListingType';
import { Listing } from '../../models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
} from 'graphql';

const managePublish = {

    type: ShowListingType,

    args: {
        listId: { type: new NonNull(IntType) },
        action: { type: new NonNull(StringType) },
        learningAimCount: { type: new NonNull(IntType) },
        profilePhoto: { type: BooleanType },
        publishDate: { type: StringType},
    },

    async resolve({ request }, { listId, action, learningAimCount, profilePhoto, publishDate }) {
        // Check whether user is logged in
        if (request.user || request.user.admin) {

            let where = { id: listId, isReady: true };
            if (!request.user.admin) {
                where = {
                    id: listId,
                    isReady: true,
                    userId: request.user.id
                }
            };

            var published;
            var learningAimCounts = false;
            var profilePhotoStatus = false;
            if (action === 'publish' && learningAimCount == 0) {
                learningAimCounts = true;
            }

            if (action === 'publish' && profilePhoto) {
                profilePhotoStatus = true;
            }

            // Publish
            if (action === 'publish' && learningAimCount > 0 && profilePhoto) {
                const publish = await Listing.update({
                    isPublished: true,
                    publishDate: publishDate
                }, {
                        where
                    }).spread(function (instance) {
                        // Check if any rows are affected
                        if (instance > 0) {
                            published = true;
                        }
                    });
            }
            // UnPublish
            if (action === 'unPublish') {
                const unPublish = await Listing.update({
                    isPublished: false,
                    publishDate: null
                }, {
                        where
                    }).spread(function (instance) {
                        // Check if any rows are affected
                        if (instance > 0) {
                            published = true;
                        }
                    });
            }

            if (learningAimCounts) {
                return {
                    status: 'notAvailableLearningAim'
                };

            }

            if (!profilePhotoStatus && action === 'publish') {
                return {
                    status: 'notAvailableProfilePhoto'
                };

            }


            if (published) {
                return {
                    status: '200'
                };
            } else {
                return {
                    status: '400'
                }
            }
        } else {
            return {
                status: "notLoggedIn"
            };
        }
    },
};

export default managePublish;

/**
mutation ManagePublish($listId: Int!, $action: String!, $learningAimCount: Int!, $profilePhoto: String!) {
    managePublish(listId: $listId, action: $action, learningAimCount: $learningAimCount, profilePhoto: $profilePhoto) {
        status
    }
}
 */
