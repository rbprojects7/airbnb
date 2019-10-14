import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';

import {
    MANANGE_LISTING_PUBLISH_STATUS_START,
    MANANGE_LISTING_PUBLISH_STATUS_SUCCESS,
    MANANGE_LISTING_PUBLISH_STATUS_ERROR,
} from '../../constants';
import { openSocialShareModal } from '../modalActions';
// To Refresh the Manage Listing Status
const ManageListingQuery = gql`
    query ManageListings{
        ManageListings {
            id
            title
            city
            updatedAt
            coverPhoto
            isPublished
            isReady
            isDeleted
            publishDate
            listPhotos{
                id
                name
            }
            settingsData {
                listsettings {
                    id
                    itemName
                }
            }
            listingSteps {
                id
                step1
                step2
                step3
            }
            learningAimCount
            user {
              profile {
                picture
              }
            }
        }
  }`;

// To Refresh Listing Steps Query
const ListingStepsQuery = gql`
    query ($listId:String!) {
        showListingSteps (listId:$listId) {
            id
            listId
            step1
            step2
            step3
            listing {
                id
                isReady
                isPublished
                isDeleted
                user {
                    profile {
                      picture
                    }
                  }
            }
            learningAimCount
        }
    }`;

export function ManagePublishStatus(listId, action, learningAimCount, profilePhoto, publishDate) {
    
    return async (dispatch, getState, { client }) => {

        dispatch({ type: MANANGE_LISTING_PUBLISH_STATUS_START });

        const mutation = gql`
            mutation ManagePublish($listId: Int!, $action: String!, $learningAimCount: Int!, $profilePhoto: Boolean, $publishDate: String ) {
                managePublish(listId: $listId, action: $action, learningAimCount: $learningAimCount, profilePhoto: $profilePhoto, publishDate: $publishDate) {
                    status
                }
            }
        `;

        try {

            let type = 'Publish Listing';
            if (action === 'unPublish') {
                type = 'UnPublish Listing';
            }

            const { data } = await client.mutate({
                mutation,
                variables: {
                    listId,
                    action,
                    learningAimCount,
                    profilePhoto,
                    publishDate,
                },
                refetchQueries: [
                    { query: ManageListingQuery },
                ]
            });

            if (data.managePublish.status === 'notAvailableLearningAim') {
                toastr.error("Please enter atleast one Learning Aim.");
                dispatch({
                    type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
                    payload: {
                        status: data.managePublish.status
                    }
                });
            } else if (data.managePublish.status === 'notAvailableProfilePhoto') {
                toastr.error("Please upload your profile picture.");
                dispatch({
                    type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
                    payload: {
                        status: data.managePublish.status
                    }
                });
            } else if (data.managePublish.status === '200') {
                // Reload Existing Steps Page
                const { data } = await client.query({
                    query: ListingStepsQuery,
                    variables: { listId },
                    fetchPolicy: 'network-only',
                });
                toastr.success(type, `${type} is success!`);
                if(action === 'publish'){
                    dispatch(openSocialShareModal());
                }
                dispatch({
                    type: MANANGE_LISTING_PUBLISH_STATUS_SUCCESS,
                    payload: {
                        listingSteps: data.showListingSteps,
                    }
                });
            } else {
                toastr.error(type, `${type} is failed!`);
                dispatch({
                    type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
                    payload: {
                        status: data.managePublish.status
                    }
                });
            }

        } catch (error) {
            dispatch({
                type: MANANGE_LISTING_PUBLISH_STATUS_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}
