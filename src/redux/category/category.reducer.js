import categoryActionTypes from './category.types';

const initialState = {
    isFetching: false,
    response: null,
    errorMessage: undefined,
    categories: [],
    submitted: false,
    selectedCategoryId: null,
    loadedCategory: null,
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
        case categoryActionTypes.FETCH_SINGLE_CATEGORY_START:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case categoryActionTypes.FETCH_SINGLE_CATEGORY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                selectedCategoryId: action.payload,
                loadedCategory: action.payload
            }
        case categoryActionTypes.FETCH_SINGLE_CATEGORY_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                response: action.payload
            }
        case categoryActionTypes.DELETE_CATEGORY_START:
            return {
                ...state,
                error: false
            }
        case categoryActionTypes.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                error: false,
                response: action.payload
            }
        case categoryActionTypes.DELETE_CATEGORY_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }
         case categoryActionTypes.ADD_CATEGORY_START:
            return {
                ...state,
                error: false,
                submitted: false
            }
        case categoryActionTypes.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                error: false,
                submitted: true,
                response: action.payload,
                addedProduct: action.payload
            }
        case categoryActionTypes.ADD_CATEGORY_FAILED:
            return {
                ...state,
                error: true,
                submitted: false,
                response: action.payload
            }
        default:
            return state;
    }
}

export default categoryReducer;