import productActionTypes from './product.types';

const initialState = {
    loadedProduct: null,
    products: [],
    selected: false,
    selectedProductId: null,
    isFetching: false,
    response: null,
    errorMessage: undefined,
    submitted: false,
    error: false
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case productActionTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                isFetching: true,
                error: false,
            }
        case productActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                products: action.payload,
                // products: [
                //     ...state.products,
                //     ...action.payload,

                // ],
                // data: [
                //     ...state.data,
                //     {[action.page]: action.payload}
                // ],
                page: action.page,
                address: action.address
            }
        case productActionTypes.FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload
            }
        case productActionTypes.FETCH_SINGLE_PRODUCT_START:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case productActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                loadedProduct: action.payload
            }
        case productActionTypes.FETCH_SINGLE_PRODUCT_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                response: action.payload
            }
        case productActionTypes.DELETE_PRODUCT_START:
            return {
                ...state,
                error: false
            }
        case productActionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                error: false,
                response: action.payload
            }
        case productActionTypes.DELETE_PRODUCT_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }
         case productActionTypes.ADD_PRODUCT_START:
            return {
                ...state,
                error: false,
                submitted: false
            }
        case productActionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                error: false,
                submitted: true,
                addedProduct: action.payload
            }
        case productActionTypes.ADD_PRODUCT_FAILED:
            return {
                ...state,
                error: true,
                submitted: false,
                errorMessage: action.payload
            }
        case productActionTypes.FETCH_HISTORY_START:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case productActionTypes.FETCH_HISTORY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                products: action.payload
            }
        case productActionTypes.FETCH_HISTORY_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload
            }
        // case productActionTypes.FETCH_PAGES_START:
        //     return {
        //         ...state,
        //         isFetching: true,
        //         error: false
        //     }
        // case productActionTypes.FETCH_PAGES_SUCCESS:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         error: false,
        //         pageCount: action.payload
        //     }
        // case productActionTypes.FETCH_PAGES_FAILED:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         error: true,
        //         errorMessage: action.payload
        //     }
        default:
            return state;
    }
}

export default productReducer;