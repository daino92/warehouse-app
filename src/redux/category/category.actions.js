import categoryActionTypes from "./category.types";
import axiosInstance from '../../axios';

export const fetchCategoriesStart = () => ({
    type: categoryActionTypes.FETCH_CATEGORIES_START
})

export const fetchCategoriesSuccess = categories => ({
    type: categoryActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categories
})

export const fetchCategoriesFailed = errorMessage => ({
    type: categoryActionTypes.FETCH_CATEGORIES_FAILED,
    payload: errorMessage 
})

export const initCategories = () => {
    return dispatch => {
        dispatch(fetchCategoriesStart());
        axiosInstance.get('/category/')
            .then(response => {
                const categories = response.data;
                dispatch(fetchCategoriesSuccess(categories))
            })
            .catch(error => {
                dispatch(fetchCategoriesFailed(error.message))
            });
    }
}