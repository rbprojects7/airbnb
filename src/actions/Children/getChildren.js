
// Fetch request
import fetch from '../../core/fetch';

import {
  GET_CHILD_DATA_START,
  GET_CHILD_DATA_SUCCESS,
  GET_CHILD_DATA_ERROR
} from '../../constants';


const query = `
      query children (
        $parentId: String
      ) {
          children (
            parentId: $parentId,
          ) {
            id,
            parentId,
            firstName,
            lastName,
            preferredName,
            birthday,
            email,
            preferences,
            childId
          }
        }
`;

export function getChildren() {

  return async (dispatch, getState, { graphqlRequest }) => {

    const state = getState();

    dispatch({
      type: GET_CHILD_DATA_START,
    });
    try {
      // const { data } = await graphqlRequest(query, { parentId: state.account.data.userId });

      const params = {
        parentId: state.account.data.userId,
      }

      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query,
          variables: params
        }),
        credentials: 'include',
      });

      const { data } = await resp.json();  

      if(data && data.children) {
        dispatch({
          type: GET_CHILD_DATA_SUCCESS,
          payload: data.children
        });
      }

    } catch (error) {
      dispatch({
        type: GET_CHILD_DATA_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  }
}
