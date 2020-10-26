import productActionTypes from './product.types';

const initialState = {
    loadedProduct: null,
    products: [],
    limitOptions: {
        label: 'Choose limit',
        value: 12,             
        options: [
            { label: 12, value: 12 }, 
            { label: 16, value: 16 }, 
            { label: 20, value: 20 }, 
            { label: 24, value: 24 }, 
            { label: 28, value: 28 }
        ]
    },
    page: "1",
    isFetching: false,
    response: null,
    errorMessage: undefined,
    submitted: false,
    error: false,
    skuSearch: {
        params: {
            placeholder: "E.g. P1134",
            type: "input"
        },
        value: "",
        maxLength: 5
    },
    searchBySKU: false,
    disableFilters: false
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case productActionTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                isFetching: true
            }
        case productActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.payload
            }
        case productActionTypes.FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                isFetching: false,
                response: action.payload
            }
        case productActionTypes.FETCH_SINGLE_PRODUCT_START:
            return {
                ...state,
                isFetching: true
            }
        case productActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
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
                ...state
            }
        case productActionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                response: action.payload
            }
        case productActionTypes.DELETE_PRODUCT_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }

        case productActionTypes.FETCH_HISTORY_START:
            return {
                ...state,
                isFetching: true
            }
        case productActionTypes.FETCH_HISTORY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.payload
            }
        case productActionTypes.FETCH_HISTORY_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload
            }
        case productActionTypes.PAGE_UNLOADED:
            return {
                ...state,
                response: "",
                submitted: false,
                errorMessage: "",
                loadedProduct: ""
            };
        case productActionTypes.LIMIT_UPDATE:
            /* Necessary check because empty selection returns undefined in react-select lib */
            if (action.payload.value === undefined && action.payload.label === undefined) {
                action.payload.value = "";
                action.payload.label = "Select...";
            }

            return {
                ...state,
                limitOptions: {
                    ...state.limitOptions,
                    value: action.payload.value,
                    displayValue: action.payload.label
                }
            };
        case productActionTypes.PAGE_UPDATE:
            return {
                ...state,
                page: action.payload
            };
        case productActionTypes.SET_SKU:
            return {
                ...state,
                skuSearch: {
                    ...state.skuSearch,
                    value: action.payload
                }
            }
        case productActionTypes.SKU_SEARCH:
            return {
                ...state,
                disableFilters: true,
                searchBySKU: true
            }
        case productActionTypes.CLEAR_SKU_SEARCH:
            return {
                ...state,
                disableFilters: false,
                searchBySKU: false,
                skuSearch: {
                    ...state.skuSearch,
                    value: ""
                }
            }
        default:
            return state;
    }
}

export default productReducer;