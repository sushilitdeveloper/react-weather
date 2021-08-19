import { NEW_COORDS} from './coordActionTypes';

const initialState = {
    lon: 0,
    lat: 0
}

const coordReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_COORDS:
            return {
                ...state,
                lon: action?.payload?.lon,
                lat: action?.payload?.lat
            }
    
        default:
            return state;
    }
}

export default coordReducer;