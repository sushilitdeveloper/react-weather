import { NEW_COORDS } from './coordActionTypes';

export const SET_COORDS = (payload = null) => {
    return {
        type: NEW_COORDS,
        payload: payload
    }
}