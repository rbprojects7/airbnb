import { gql } from 'react-apollo';
import {
    REMOVE_BLOCK_START,
    REMOVE_BLOCK_SUCCESS,
    REMOVE_BLOCK_ERROR
} from '../constants'; 

export function removeBlock( blockId ) {

  return async (dispatch, getState, { client }) => {
    dispatch({
      type: REMOVE_BLOCK_START,
    });

    try {

      const mutation = gql`
        mutation RemoveBlock($blockId:String!) {
          RemoveBlock (blockId:$blockId) {
            status
          }
        }
      `;
      // Send Request to get listing data
      const {data} = await client.mutate({
        mutation,
        variables: {blockId},
        // refetchQueries: [{ query }]
      });
      if(data && data.RemoveBlock.status === 'success'){
        dispatch({
          type: REMOVE_BLOCK_SUCCESS,
        });
      } else {
        dispatch({
            type: REMOVE_BLOCK_ERROR,
        });
      }
    } catch (error) {
        dispatch({
            type: REMOVE_BLOCK_ERROR,
          payload:{
            error
          }
        });
      return false;
    }

    return true;
  };
}