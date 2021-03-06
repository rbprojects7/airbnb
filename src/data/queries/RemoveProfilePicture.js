import UserEditProfile from '../types/userEditProfileType';
import { UserProfile, Listing } from '../../data/models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType
} from 'graphql';

const RemoveProfilePicture = {

    type: UserEditProfile,

    async resolve({ request }) {

        if (request.user && request.user.admin != true) {
            const removePicture = await UserProfile.update({
                picture: null
            }, {
                    where: {
                        userId: request.user.id
                    }
                });

            if (removePicture) {
                const updateListing = await Listing.update({
                    isPublished: false
                }, {
                        where: {
                            userId: request.user.id
                        }
                    });

                return {
                    status: 'success'
                }

            }
        } else {
            return { status: 'notLoggedIn' }
        }
    }
};

export default RemoveProfilePicture;