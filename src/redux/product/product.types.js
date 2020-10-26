const productActionTypes = {
    FETCH_PRODUCTS_START: 'FETCH_PRODUCTS_START',
    FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAILED: 'FETCH_PRODUCTS_FAILED',

    SET_PRODUCTS: 'SET_PRODUCTS',

    FETCH_SINGLE_PRODUCT_START: 'FETCH_SINGLE_PRODUCT_START',
    FETCH_SINGLE_PRODUCT_SUCCESS: 'FETCH_SINGLE_PRODUCT_SUCCESS',
    FETCH_SINGLE_PRODUCT_FAILED: 'FETCH_SINGLE_PRODUCT_FAILED',

    DELETE_PRODUCT_START: 'DELETE_PRODUCT_START',
    DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_FAILED: 'DELETE_PRODUCT_FAILED',

    DISABLE_PRODUCT_START: 'DISABLE_PRODUCT_START',
    DISABLE_PRODUCT_SUCCESS: 'DISABLE_PRODUCT_SUCCESS',
    DISABLE_PRODUCT_FAILED: 'DISABLE_PRODUCT_FAILED',
    
    SELECT_PRODUCT_ID: 'SELECT_PRODUCT_ID',

    FETCH_HISTORY_START: 'FETCH_HISTORY_START',
    FETCH_HISTORY_SUCCESS: 'FETCH_HISTORY_SUCCESS',
    FETCH_HISTORY_FAILED: 'FETCH_HISTORY_FAILED',
    
    FETCH_PAGES_START: 'FETCH_PAGES_START',
    FETCH_PAGES_SUCCESS: 'FETCH_PAGES_SUCCESS',
    FETCH_PAGES_FAILED: 'FETCH_PAGES_FAILED',

    PAGE_UNLOADED: 'PAGE_UNLOADED',

    LIMIT_UPDATE: 'LIMIT_UPDATE',
    PAGE_UPDATE: 'PAGE_UPDATE',

    SET_SKU: 'SET_SKU',
    SKU_SEARCH: 'SKU_SEARCH',
    CLEAR_SKU_SEARCH: 'CLEAR_SKU_SEARCH'
}

export default productActionTypes;