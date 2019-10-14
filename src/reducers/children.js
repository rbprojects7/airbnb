import {
  GET_CHILD_DATA_START,
  GET_CHILD_DATA_SUCCESS,
  GET_CHILD_DATA_ERROR
} from '../constants';

export default function children(state = {}, action) {
  switch (action.type) {
    case GET_CHILD_DATA_START:
      return {
        ...state,
      };
    case GET_CHILD_DATA_SUCCESS:
      return action.payload;
    case GET_CHILD_DATA_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
