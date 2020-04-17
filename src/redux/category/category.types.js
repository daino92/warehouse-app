const categoryActionTypes = {
    FETCH_CATEGORIES_START: 'FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED: 'FETCH_CATEGORIES_FAILED',
    
    FETCH_SINGLE_CATEGORY_START: 'FETCH_SINGLE_CATEGORY_START',
    FETCH_SINGLE_CATEGORY_SUCCESS: 'FETCH_SINGLE_CATEGORY_SUCCESS',
    FETCH_SINGLE_CATEGORY_FAILED: 'FETCH_SINGLE_CATEGORY_FAILED',

    DELETE_CATEGORY_START: 'DELETE_CATEGORY_START',
    DELETE_CATEGORY_SUCCESS: 'DELETE_CATEGORY_SUCCESS',
    DELETE_CATEGORY_FAILED: 'DELETE_CATEGORY_FAILED',

    ADD_CATEGORY_START: 'ADD_CATEGORY_START',
    ADD_CATEGORY_SUCCESS: 'ADD_CATEGORY_SUCCESS',
    ADD_CATEGORY_FAILED: 'ADD_CATEGORY_FAILED',

    UPDATE_CATEGORY_START: 'UPDATE_CATEGORY_START',
    UPDATE_CATEGORY_SUCCESS: 'UPDATE_CATEGORY_SUCCESS',
    UPDATE_CATEGORY_FAILED: 'UPDATE_CATEGORY_FAILED',

    PAGE_UNLOADED: 'PAGE_UNLOADED',

    CATEGORY_UPDATE: 'CATEGORY_UPDATE'
}

export default categoryActionTypes;