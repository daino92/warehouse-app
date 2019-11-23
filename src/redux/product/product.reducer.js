import ProductActionTypes from './product.types';

const initialState = {
    loadedProduct: null,
    products: [],
    selected: false,
    selectedProductId: null,
    isFetching: false,
    errorMessage: undefined,
    error: false
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case ProductActionTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                isFetching: true,
                error: false,
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
        // case ProductActionTypes.SELECT_PRODUCT_ID:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         selected: true,
        //         productId: action.payload
        //     }
        case ProductActionTypes.FETCH_SINGLE_PRODUCT_START:
            return {
                ...state,
                isFetching: true,
                error: false,
                loadedProduct: false
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
                loadedProduct: false,
                error: true,
                errorMessage: action.payload
            }
        case ProductActionTypes.DELETE_PRODUCT_START:
            return {
                ...state,
                isFetching: true,
                error: false,
                loadedProduct: false
            }
        case ProductActionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                loadedProduct: action.payload
            }
        case ProductActionTypes.DELETE_PRODUCT_FAILED:
            return {
                ...state,
                isFetching: false,
                loadedProduct: false,
                error: true,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;