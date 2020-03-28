import categoryActionTypes from './category.types';

const initialState = {
    isFetching: false,
    response: null,
    errorMessage: undefined,
    categories: null,
    error: false
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case categoryActionTypes.FETCH_CATEGORIES_START:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case categoryActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                categories: action.payload
            }
        case categoryActionTypes.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default categoryReducer;