import storeActionTypes from "./store.types";
import axiosInstance from '../../axios';

export const fetchStoresStart = () => ({
    type: storeActionTypes.FETCH_STORES_START
})

export const fetchStoresSuccess = stores => ({
    type: storeActionTypes.FETCH_STORES_SUCCESS,
    payload: stores
})

export const fetchStoresFailed = errorMessage => ({
    type: storeActionTypes.FETCH_STORES_FAILED,
    payload: errorMessage 
})

export const initStores = () => {
    return dispatch => {
        dispatch(fetchStoresStart());
        axiosInstance.get(`/store`)
            .then(response => {
                const stores = response.data;
                dispatch(fetchStoresSuccess(stores))
            })
            .catch(error => {
                console.log("Error: ", error)
                dispatch(fetchStoresFailed(error))
            });
    }
}