import categoryActionTypes from './category.types';

const initialState = {
    isFetching: false,
    response: null,
    updated: null,
    errorMessage: undefined,
    categories: [],
    categoryOptions: {
        label: 'Choose a category',
        value: '',   
        displayValue: '',          
        options: []
    },
    submitted: false,
    loadedCategory: null,
    error: false,
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case categoryActionTypes.FETCH_CATEGORIES_START:
            return {
                ...state,
                isFetching: true
            }
        case categoryActionTypes.FETCH_CATEGORIES_SUCCESS:
            // tweak category response for react-select lib
            let newCategories = action.payload.map(({ id: value, value: label, ...rest }) => ({ value, label, ...rest })); 

            return {
                ...state,
                isFetching: false,
                categories: action.payload,
                categoryOptions: {
                    ...state.categoryOptions,
                    options: [
                        state.categoryOptions.options,
                        ...newCategories
                    ]
                }
            }
        case categoryActionTypes.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: true,
                isFetching: false,
                errorMessage: action.payload
            }
        case categoryActionTypes.FETCH_SINGLE_CATEGORY_START:
            return {
                ...state,
                isFetching: true
            }
        case categoryActionTypes.FETCH_SINGLE_CATEGORY_SUCCESS:
            return {
                ...state,
                isFetching: false,
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
                submitted: false
            }
        case categoryActionTypes.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                submitted: true,
                response: action.payload
            }
        case categoryActionTypes.ADD_CATEGORY_FAILED:
            return {
                ...state,
                error: true,
                submitted: false,
                response: action.payload
            }
        case categoryActionTypes.UPDATE_CATEGORY_START:
            return {
                ...state,
                submitted: false
            }
        case categoryActionTypes.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                submitted: true,
                updated: action.payload
            }
        case categoryActionTypes.UPDATE_CATEGORY_FAILED:
            return {
                ...state,
                error: true,
                submitted: false
            }
        case categoryActionTypes.PAGE_UNLOADED:
            return {
                ...state,
                response: '',
                updated: null
            };
        case categoryActionTypes.CATEGORY_UPDATE:
            /* Necessary check because empty selection returns undefined in react-select lib */
            if (action.payload.value === undefined && action.payload.label === undefined) {
                action.payload.value = "";
                action.payload.label = "Select...";
            }

            return {
                ...state,
                categoryOptions: {
                    ...state.categoryOptions,
                    value: action.payload.value,
                    displayValue: action.payload.label
                }        
            }   
        default:
            return state;
    }
}

export default categoryReducer;