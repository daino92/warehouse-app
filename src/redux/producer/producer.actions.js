import ProducerActionTypes from "./producer.types";
import axiosInstance from '../../axios';

export const fetchProducersStart = () => ({
    type: ProducerActionTypes.FETCH_PRODUCERS_START
})

export const fetchProducersSuccess = producers => ({
    type: ProducerActionTypes.FETCH_PRODUCERS_SUCCESS,
    payload: producers
})

export const fetchProducersFailed = errorMessage => ({
    type: ProducerActionTypes.FETCH_PRODUCERS_FAILED,
    payload: errorMessage 
})

export const fetchSingleProducerStart = () => ({
    type: ProducerActionTypes.FETCH_SINGLE_PRODUCER_START
})

export const fetchSingleProducerSuccess = id => ({
    type: ProducerActionTypes.FETCH_SINGLE_PRODUCER_SUCCESS,
    payload: id
})

export const fetchSingleProducerFailed = errorMessage => ({
    type: ProducerActionTypes.FETCH_SINGLE_PRODUCER_FAILED,
    payload: errorMessage 
})

export const deleteProducerStart = () => ({
    type: ProducerActionTypes.DELETE_PRODUCER_START
})

export const deleteProducerSuccess = id => ({
    type: ProducerActionTypes.DELETE_PRODUCER_SUCCESS,
    payload: id
})

export const deleteProducerFailed = errorMessage => ({
    type: ProducerActionTypes.DELETE_PRODUCER_FAILED,
    payload: errorMessage 
})

export const addProducerStart = () => ({
    type: ProducerActionTypes.ADD_PRODUCER_START
})

export const addProducerSuccess = producer => ({
    type: ProducerActionTypes.ADD_PRODUCER_SUCCESS,
    payload: producer
})

export const addProducerFailed = errorMessage => ({
    type: ProducerActionTypes.ADD_PRODUCER_FAILED,
    payload: errorMessage 
})

export const updateProducerStart = () => ({
    type: ProducerActionTypes.UPDATE_PRODUCER_START
})

export const updateProducerSuccess = producer => ({
    type: ProducerActionTypes.UPDATE_PRODUCER_SUCCESS,
    payload: producer
})

export const updateProducerFailed = errorMessage => ({
    type: ProducerActionTypes.UPDATE_PRODUCER_FAILED,
    payload: errorMessage 
})

export const initProducers = () => {
    return dispatch => {
        dispatch(fetchProducersStart());
        axiosInstance.get('/producer/all')
            .then(response => {
                const producers = response.data;
                dispatch(fetchProducersSuccess(producers))
            })
            .catch(error => {
                dispatch(fetchProducersFailed(error))
            });
    }
}

export const initSingleProducer = id => {
    return dispatch => {
        dispatch(fetchSingleProducerStart());
        axiosInstance.get(`/producer?producerId=${id}`)
            .then(response => {
                const producer = response.data;
                console.log("Data of individual producer: ", response);
                dispatch(fetchSingleProducerSuccess(producer))
            })
            .catch(error => {
                dispatch(fetchSingleProducerFailed(error))
            });
    }
}

export const initDeleteProducer = id => {
    return dispatch => {
        dispatch(deleteProducerStart());
        axiosInstance.delete(`/producer/${id}`)
            .then(response => {
                console.log("Producer deleted successfully: ", response);
                dispatch(deleteProducerSuccess(response))
            }).catch(error => {
                dispatch(deleteProducerFailed(error))
            });
    }
}

export const initAddProducer = producer => {
    return dispatch => {
        dispatch(addProducerStart());
        axiosInstance.post('/producer/create/', producer)
            .then(response => {
                console.log("Producer added successfully: " , response);
                dispatch(addProducerSuccess(response))
            }).catch(error => {
                dispatch(addProducerFailed(error))
            });
    }
}

export const initUpdateProducer = producer => {
    return dispatch => {
        dispatch(updateProducerStart());
        axiosInstance.patch('/producer/update/', producer)
            .then(response => {
                console.log("Producer updated successfully: " , response);
                dispatch(updateProducerSuccess(response))
            }).catch(error => {
                dispatch(updateProducerFailed(error))
            });
    }
}