import {
    SET_UPDATE_TIME_START,
    SET_UPDATE_TIME_COMPLETE
} from '../../constants';

export function setUpdateTimeStart(blockNumber) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: SET_UPDATE_TIME_START,
            payload: {
                blockNumber,
                status: true
            }
        });
    }
}

export function setUpdateTimeComplete(blockNumber) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: SET_UPDATE_TIME_COMPLETE,
            payload: {
                blockNumber,
                status: false
            }
        });
    }
}