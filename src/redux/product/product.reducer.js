import ProductActionTypes from './product.types';

const initialState = {
    loadedProduct: null,
    products: [],
    selected: false,
    selectedProductId: null,
    isFetching: false,
    errorMessage: undefined
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        // case ProductActionTypes.ADD_PRODUCT:
        //     return {
        //         ...state,
        //     }
        // case ProductActionTypes.DELETE_PRODUCT:
        //     return {
        //         ...state,
        //         isFetching: false,
        //     }
        case ProductActionTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                isFetching: true
            }
        case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.payload
            }
        case ProductActionTypes.FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ProductActionTypes.SELECT_PRODUCT_ID:
            return {
                ...state,
                isFetching: false,
                selected: true,
                //selectedProductId: ,
                productId: action.payload
            }
        case ProductActionTypes.FETCH_SINGLE_PRODUCT_START:
            return {
                ...state,
                isFetching: true
            }
        case ProductActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                product: action.payload
            }
        case ProductActionTypes.FETCH_SINGLE_PRODUCT_FAILED:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;