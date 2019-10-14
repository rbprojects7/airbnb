import {gql} from 'react-apollo';
// Toaster
import {toastr} from 'react-redux-toastr';
import {setLoaderStart, setLoaderComplete} from './loader/loader';

import {
    UPDATE_NEWSLETTER_STARTS,
    UPDATE_NEWSLETTER_SUCCESS,
    UPDATE_NEWSLETTER_ERROR,
} from '../constants';

// Load account data to update email verification
import { loadAccount } from './account';


export function newsLetterAction(isNewsLetterAccepted, page) {

    return async(dispatch, getState, {client}) => {

        dispatch({type: UPDATE_NEWSLETTER_STARTS});

        let mutation = gql `
            mutation updateNewsletter($isNewsLetterAccepted: Int!){
                updateNewsletter(isNewsLetterAccepted: $isNewsLetterAccepted) {
                    status
                }
            }
        `;

        try {

            const {data} = await client.mutate({
                mutation,
                variables: {
                    isNewsLetterAccepted
                },
                // refetchQueries: [{ query }]
            });

            if (data.updateNewsletter.status === "success") {
                dispatch({type: UPDATE_NEWSLETTER_SUCCESS});
                await dispatch(loadAccount());
                if(isNewsLetterAccepted != 3 && !page) {
                toastr.success("Success");
                }
            } else {
                dispatch({
                    type: UPDATE_VERIFICATION_ERROR, 
                    payload: {
                        status: data.updateNewsletter.status
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_NEWSLETTER_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}



