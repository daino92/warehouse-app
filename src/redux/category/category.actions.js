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

export const fetchSingleCategoryStart = () => ({
    type: categoryActionTypes.FETCH_SINGLE_CATEGORY_START
})

export const fetchSingleCategorySuccess = id => ({
    type: categoryActionTypes.FETCH_SINGLE_CATEGORY_SUCCESS,
    payload: id
})

export const fetchSingleCategoryFailed = errorMessage => ({
    type: categoryActionTypes.FETCH_SINGLE_CATEGORY_FAILED,
    payload: errorMessage 
})

export const deleteCategoryStart = () => ({
    type: categoryActionTypes.DELETE_CATEGORY_START
})

export const deleteCategorySuccess = id => ({
    type: categoryActionTypes.DELETE_CATEGORY_SUCCESS,
    payload: id
})

export const deleteCategoryFailed = errorMessage => ({
    type: categoryActionTypes.DELETE_CATEGORY_FAILED,
    payload: errorMessage 
})

export const addCategoryStart = () => ({
    type: categoryActionTypes.ADD_CATEGORY_START
})

export const addCategorySuccess = category => ({
    type: categoryActionTypes.ADD_CATEGORY_SUCCESS,
    payload: category
})

export const addCategoryFailed = errorMessage => ({
    type: categoryActionTypes.ADD_CATEGORY_FAILED,
    payload: errorMessage 
})

export const updateCategoryStart = () => ({
    type: categoryActionTypes.UPDATE_CATEGORY_START
})

export const updateCategorySuccess = category => ({
    type: categoryActionTypes.UPDATE_CATEGORY_SUCCESS,
    payload: category
})

export const updateCategoryFailed = errorMessage => ({
    type: categoryActionTypes.UPDATE_CATEGORY_FAILED,
    payload: errorMessage 
})

export const categoryUpdate = categoryId => ({
    type: categoryActionTypes.CATEGORY_UPDATE,
    payload: categoryId 
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
                dispatch(fetchCategoriesFailed(error))
            });
    }
}

export const initSingleCategory = id => {
    return dispatch => {
        dispatch(fetchSingleCategoryStart());
        axiosInstance.get(`/category/${id}`)
            .then(response => {
                const category = response.data;
                console.log("Data of individual category: ", response);
                dispatch(fetchSingleCategorySuccess(category))
            })
            .catch(error => {
                dispatch(fetchSingleCategoryFailed(error))
            });
    }
}

export const initDeleteCategory = id => {
    return dispatch => {
        dispatch(deleteCategoryStart());
        axiosInstance.delete(`/category/${id}`)
            .then(response => {
                console.log("Category deleted successfully: ", response);
                dispatch(deleteCategorySuccess(response))
            }).catch(error => {
                dispatch(deleteCategoryFailed(error))
            });
    }
}

export const initAddCategory = category => {
    return dispatch => {
        dispatch(addCategoryStart());
        axiosInstance.post('/category/create/', category)
            .then(response => {
                console.log("Category added successfully: " , response);
                dispatch(addCategorySuccess(response))
            }).catch(error => {
                dispatch(addCategoryFailed(error))
            });
    }
}

export const initUpdateCategory = id => {
    return dispatch => {
        dispatch(updateCategoryStart());
        axiosInstance.patch(`/category/update/${id}`)
            .then(response => {
                console.log("Category updated successfully: " , response);
                dispatch(updateCategorySuccess(response))
            }).catch(error => {
                dispatch(updateCategoryFailed(error))
            });
    }
}