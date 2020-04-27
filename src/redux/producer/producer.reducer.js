import producerActionTypes from './producer.types';

const initialState = {
    isFetching: false,
    response: null,
    updated: null,
    errorMessage: undefined,
    producers: [],
    producersOptions: {
        label: 'Choose a producer',
        value: '',             
        options: []
    },
    submitted: false,
    loadedproducer: null,
    error: false,
}

const producerReducer = (state = initialState, action) => {
    switch(action.type) {
        case producerActionTypes.FETCH_PRODUCERS_START:
            return {
                ...state,
                isFetching: true
            }
        case producerActionTypes.FETCH_PRODUCERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                producers: action.payload,
                producersOptions: {
                    ...state.producersOptions,
                    options: [
                        state.producersOptions.options,
                        ...action.payload
                    ]
                }
            }
        case producerActionTypes.FETCH_PRODUCERS_FAILED:
            return {
                ...state,
                error: true,
                isFetching: false,
                errorMessage: action.payload
            }
        case producerActionTypes.FETCH_SINGLE_PRODUCER_START:
            return {
                ...state,
                isFetching: true
            }
        case producerActionTypes.FETCH_SINGLE_PRODUCER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                loadedproducer: action.payload
            }
        case producerActionTypes.FETCH_SINGLE_PRODUCER_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
                response: action.payload
            }
        case producerActionTypes.DELETE_PRODUCER_START:
            return {
                ...state,
                error: false
            }
        case producerActionTypes.DELETE_PRODUCER_SUCCESS:
            return {
                ...state,
                response: action.payload
            }
        case producerActionTypes.DELETE_PRODUCER_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }
        case producerActionTypes.ADD_PRODUCER_START:
            return {
                ...state,
                submitted: false
            }
        case producerActionTypes.ADD_PRODUCER_SUCCESS:
            return {
                ...state,
                submitted: true,
                response: action.payload
            }
        case producerActionTypes.ADD_PRODUCER_FAILED:
            return {
                ...state,
                error: true,
                submitted: false,
                response: action.payload
            }
        case producerActionTypes.UPDATE_PRODUCER_START:
            return {
                ...state,
                submitted: false
            }
        case producerActionTypes.UPDATE_PRODUCER_SUCCESS:
            return {
                ...state,
                submitted: true,
                updated: action.payload
            }
        case producerActionTypes.UPDATE_PRODUCER_FAILED:
            return {
                ...state,
                error: true,
                submitted: false
            }
        case producerActionTypes.PRODUCER_UPDATE:
            return {
                ...state,    
                producersOptions: {
                    ...state.producersOptions,
                    value: action.payload
                }    
            } 
        default:
            return state;
    }
}

export default producerReducer;