import productActionTypes from "./product.types";
import axiosInstance from '../../axios';

export const fetchProductsStart = () => ({
    type: productActionTypes.FETCH_PRODUCTS_START
})

export const fetchProductsSuccess = products => ({
    type: productActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: products
})

export const fetchProductsFailed = errorMessage => ({
    type: productActionTypes.FETCH_PRODUCTS_FAILED,
    payload: errorMessage 
})

export const fetchSingleProductStart = () => ({
    type: productActionTypes.FETCH_SINGLE_PRODUCT_START
})

export const fetchSingleProductSuccess = stockId => ({
    type: productActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: stockId
})

export const fetchSingleProductFailed = errorMessage => ({
    type: productActionTypes.FETCH_SINGLE_PRODUCT_FAILED,
    payload: errorMessage 
})

export const deleteProductStart = () => ({
    type: productActionTypes.DELETE_PRODUCT_START
})

export const deleteProductSuccess = stockId => ({
    type: productActionTypes.DELETE_PRODUCT_SUCCESS,
    payload: stockId
})

export const deleteProductFailed = errorMessage => ({
    type: productActionTypes.DELETE_PRODUCT_FAILED,
    payload: errorMessage 
})

export const addProductStart = () => ({
    type: productActionTypes.ADD_PRODUCT_START
})

export const addProductSuccess = product => ({
    type: productActionTypes.ADD_PRODUCT_SUCCESS,
    payload: product
})

export const addProductFailed = errorMessage => ({
    type: productActionTypes.ADD_PRODUCT_FAILED,
    payload: errorMessage 
})

export const fetchHistoryStart = () => ({
    type: productActionTypes.FETCH_HISTORY_START
})

export const fetchHistorySuccess = products => ({
    type: productActionTypes.FETCH_HISTORY_SUCCESS,
    payload: products
})

export const fetchHistoryFailed = errorMessage => ({
    type: productActionTypes.FETCH_HISTORY_FAILED,
    payload: errorMessage 
})

export const initProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart());
        axiosInstance.get('/pseudo/get/pseudoProducts/Kifisia')
            .then(response => {
                const products = response.data;
                dispatch(fetchProductsSuccess(products))
            })
            .catch(error => {
                dispatch(fetchProductsFailed(error.message))
            });
    }
}

export const initSingleProduct = stockId => {
    return dispatch => {
        dispatch(fetchSingleProductStart());
        axiosInstance.get('/pseudo/get/' + stockId)
            .then(response => {
                const product = response.data;
                console.log("Data of individual product: ", response);
                dispatch(fetchSingleProductSuccess(product))
            })
            .catch(error => {
                dispatch(fetchSingleProductFailed(error))
            });
    }
}

export const initDeleteProduct = stockId => {
    return dispatch => {
        dispatch(deleteProductStart());
        axiosInstance.delete('/stock/delete/' + stockId)
            .then(response => {
                console.log("Product deleted successfully: ", response);
                dispatch(deleteProductSuccess(response))
            }).catch(error => {
                dispatch(deleteProductFailed(error.message))
            });
    }
}

export const initAddProduct = product => {
    return dispatch => {
        dispatch(addProductStart());
        axiosInstance.post('/posts/', product)
            .then(response => {
                console.log("Product added successfully: " , response);
                dispatch(addProductSuccess(response))
            }).catch(error => {
                dispatch(addProductFailed(error.message))
            });
    }
}

export const initHistory = () => {
    return dispatch => {
        dispatch(fetchHistoryStart());
        axiosInstance.get('/history/')
            .then(response => {
                const products = response.data;
                dispatch(fetchHistorySuccess(products))
            })
            .catch(error => {
                dispatch(fetchHistoryFailed(error.message))
            });
    }
}