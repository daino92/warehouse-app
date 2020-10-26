import newProductActionTypes from "./new-product.types";
import axiosInstance from '../../axios';

export const addProductStart = () => ({
    type: newProductActionTypes.ADD_PRODUCT_START
})

export const addProductSuccess = product => ({
    type: newProductActionTypes.ADD_PRODUCT_SUCCESS,
    payload: product
})

export const addProductFailed = errorMessage => ({
    type: newProductActionTypes.ADD_PRODUCT_FAILED,
    payload: errorMessage 
})

export const updateProductStart = () => ({
    type: newProductActionTypes.UPDATE_PRODUCT_START
})

export const updateProductSuccess = product => ({
    type: newProductActionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: product
})

export const updateProductFailed = errorMessage => ({
    type: newProductActionTypes.UPDATE_PRODUCT_FAILED,
    payload: errorMessage 
})

export const imageUploadStart = () => ({
    type: newProductActionTypes.IMAGE_UPLOAD_START
})

export const imageUploadSuccess = image => ({
    type: newProductActionTypes.IMAGE_UPLOAD_SUCCESS,
    payload: image
})

export const imageUploadFailed = errorMessage => ({
    type: newProductActionTypes.IMAGE_UPLOAD_FAILED,
    payload: errorMessage 
})

export const initPopulateFields = lists => ({
    type: newProductActionTypes.POPULATE_SELECT_FIELDS,
    payload: lists
})

export const initImageUploadProperties = imageProps => ({
    type: newProductActionTypes.IMAGE_UPLOAD_PROPERTIES,
    payload: imageProps
})

export const initProductValidation = product => ({
    type: newProductActionTypes.VALIDATION_HANDLER,
    payload: product
})

export const initEditProduct = product => ({
    type: newProductActionTypes.EDIT_PRODUCT,
    payload: product
})

export const initClearNewProduct = () => ({
    type: newProductActionTypes.CLEAR_NEW_PRODUCT
})

export const initAddProduct = product => {
    return dispatch => {
        dispatch(addProductStart());
        axiosInstance.post('/product/create/', product)
            .then(response => {
                dispatch(addProductSuccess(response))
            }).catch(error => {
                dispatch(addProductFailed(error))
            });
    }
}

export const initUpdateProduct = product => {
    return dispatch => {
        dispatch(updateProductStart());
        axiosInstance.patch('/product/update/', product)
            .then(response => {
                dispatch(updateProductSuccess(response))
            }).catch(error => {
                dispatch(updateProductFailed(error))
            });
    }
}

export const initImage = image => {
    return dispatch => {
        dispatch(imageUploadStart());
        axiosInstance.post('/image/upload/', image, {
            headers: {
                Accept: "*/*",
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log("Response: ", response)
            dispatch(imageUploadSuccess(response))
        }).catch(error => {
            console.log("Error: ", error)
            dispatch(imageUploadFailed(error))
        });
    }
}