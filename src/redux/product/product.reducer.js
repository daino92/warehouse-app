import ProductActionTypes from './product.types';

const initialState = {
    loadedProduct: null,
    products: [],
    selected: false,
    selectedProductId: null,
    isFetching: false,
    response: null,
    errorMessage: undefined,
    submitted: false,
    categories: null,
    error: false
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case ProductActionTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                products: action.payload
            }
        case ProductActionTypes.FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload
            }
        case ProductActionTypes.FETCH_SINGLE_PRODUCT_START:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case ProductActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                loadedProduct: action.payload
            }
        case ProductActionTypes.FETCH_SINGLE_PRODUCT_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                response: action.payload
            }
        case ProductActionTypes.DELETE_PRODUCT_START:
            return {
                ...state,
                error: false
            }
        case ProductActionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                error: false,
                response: action.payload
            }
        case ProductActionTypes.DELETE_PRODUCT_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }
         case ProductActionTypes.ADD_PRODUCT_START:
            return {
                ...state,
                error: false,
                submitted: false
            }
        case ProductActionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                error: false,
                submitted: true,
                addedProduct: action.payload
            }
        case ProductActionTypes.ADD_PRODUCT_FAILED:
            return {
                ...state,
                error: true,
                submitted: false,
                errorMessage: action.payload
            }
        case ProductActionTypes.FETCH_HISTORY_START:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case ProductActionTypes.FETCH_HISTORY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                products: action.payload
            }
        case ProductActionTypes.FETCH_HISTORY_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload
            }
        case ProductActionTypes.FETCH_CATEGORIES_START:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case ProductActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                categories: action.payload
            }
        case ProductActionTypes.FETCH_CATEGORIES_FAILED:
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

export default productReducer;