import storeActionTypes from './store.types';

const initialState = {
    isFetching: false,
    response: null,
    stores: [],
    errorMessage: undefined,
    error: false
}

const storeReducer = (state = initialState, action) => {
    switch(action.type) {
        case storeActionTypes.FETCH_STORES_START:
            return {
                ...state,
                isFetching: true
            }
        case storeActionTypes.FETCH_STORES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                stores: action.payload
            }
        case storeActionTypes.FETCH_STORES_FAILED:
            return {
                ...state,
                error: true,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default storeReducer;