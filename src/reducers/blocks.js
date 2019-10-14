import {
  GET_LISTING_DATA_STEP3_SUCCESS,
} from '../constants';

export default function blocks(state = {}, action) {
  switch (action.type) {

    case GET_LISTING_DATA_STEP3_SUCCESS:
      return action.newBlocks;

    default:
      return state;
  }
}
