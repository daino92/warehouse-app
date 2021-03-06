import ProductActionTypes from "./product.types";
import axiosInstance from '../../axios';

export const fetchProductsStart = () => ({
    type: ProductActionTypes.FETCH_PRODUCTS_START
})

export const fetchProductsSuccess = products => ({
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: products
})

export const fetchProductsFailed = errorMessage => ({
    type: ProductActionTypes.FETCH_PRODUCTS_FAILED,
    payload: errorMessage 
})

export const fetchSingleProductStart = () => ({
    type: ProductActionTypes.FETCH_SINGLE_PRODUCT_START
})

export const fetchSingleProductSuccess = id => ({
    type: ProductActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: id
})

export const fetchSingleProductFailed = errorMessage => ({
    type: ProductActionTypes.FETCH_SINGLE_PRODUCT_FAILED,
    payload: errorMessage 
})

export const deleteProductStart = () => ({
    type: ProductActionTypes.DELETE_PRODUCT_START
})

export const deleteProductSuccess = id => ({
    type: ProductActionTypes.DELETE_PRODUCT_SUCCESS,
    payload: id
})

export const deleteProductFailed = errorMessage => ({
    type: ProductActionTypes.DELETE_PRODUCT_FAILED,
    payload: errorMessage 
})

export const addProductStart = () => ({
    type: ProductActionTypes.ADD_PRODUCT_START
})

export const addProductSuccess = product => ({
    type: ProductActionTypes.ADD_PRODUCT_SUCCESS,
    payload: product
})

export const addProductFailed = errorMessage => ({
    type: ProductActionTypes.ADD_PRODUCT_FAILED,
    payload: errorMessage 
})

export const initProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart());
        axiosInstance.get('/posts')
            .then(response => {
                const products = response.data.slice(0, 4);
                const updatedProducts = products.map(product => {
                    return {
                        ...product,
                        price: 145.5,
                        quantity: 3,
                        imageUrl: null
                    }
                });
                dispatch(fetchProductsSuccess(updatedProducts))
            })
            .catch(error => {
                dispatch(fetchProductsFailed(error.message))
            });
    }
}

export const initSingleProduct = id => {
    return dispatch => {
        dispatch(fetchSingleProductStart());
        axiosInstance.get('/posts/' + id)
            .then(response => {
                const product = response.data;
                console.log("Data of individual product: ", response);
                dispatch(fetchSingleProductSuccess(product))
            })
            .catch(error => {
                dispatch(fetchSingleProductFailed(error.message))
            });
    }
}

export const initDeleteProduct = id => {
    return dispatch => {
        dispatch(deleteProductStart());
        axiosInstance.delete('/posts/' + id)
            .then(response => {
                console.log("Product deleted successfully: " , response);
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