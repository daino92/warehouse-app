import ProductActionTypes from "./product.types";
import axiosInstance from '../../axios';

export const addProduct = id => ({
    type: ProductActionTypes.ADD_PRODUCT,
    payload: id
})

export const deleteProduct = id => ({
    type: ProductActionTypes.DELETE_PRODUCT,
    payload: id
})

export const fetchProductsStart = () => ({
    type: ProductActionTypes.FETCH_PRODUCTS_START
})

export const fetchProductsSuccess = products => ({
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: products
})

export const fetchProductsFailed = errorMessage  => ({
    type: ProductActionTypes.FETCH_PRODUCTS_FAILED,
    payload: errorMessage 
})
export const selectProductId = productId  => ({
    type: ProductActionTypes.SELECT_PRODUCT_ID,
    payload: productId
})

export const fetchSingleProductStart = () => ({
    type: ProductActionTypes.FETCH_SINGLE_PRODUCT_START
})

export const fetchSingleProductSuccess = id => ({
    type: ProductActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: id
})

export const fetchSingleProductFailed = errorMessage  => ({
    type: ProductActionTypes.FETCH_SINGLE_PRODUCT_FAILED,
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

export const initSingleProduct = (id) => {
    return dispatch => {
        dispatch(fetchSingleProductStart());
        //const {id} = this.props.match.params;
            axiosInstance.get('/posts' + id)
                .then(response => {
                    const product = response.data;
                    console.log("Data of individual product: ", product);
                    dispatch(fetchSingleProductSuccess(product))
                })
                .catch(error => {
                    dispatch(fetchProductsFailed(error.message))
                });
    }
}