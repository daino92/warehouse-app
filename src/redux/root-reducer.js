import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productReducer from './product/product.reducer';
import categoryReducer from './category/category.reducer';
import storeReducer from './store/store.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer,
    store: storeReducer
});

export default persistReducer(persistConfig, rootReducer)