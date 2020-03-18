import ProductActionTypes from './product.types';

const initialState = {
    loadedProduct: null,
    products: [],
    selected: false,
    selectedProductId: null,
    isFetching: false,
    responseInfo: null,
    errorMessage: undefined,
    submitted: false,
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
                errorMessage: action.payload
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
                responseInfo: action.payload
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
        default:
            return state;
    }
}

export default productReducer;