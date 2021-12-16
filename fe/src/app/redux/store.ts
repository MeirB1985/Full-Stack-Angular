import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { itemsReducer } from "./items-state";
import { productsReducer } from "./products-state";
import { usersReducer } from "./user-state";
import { categoriesReducer } from "./categories-state";
import { cartsReducer } from "./carts-state";
import { ordersReducer } from "./orders-state";
import { bookedDatesReducer } from "./bookeddates-state";

const reducers = combineReducers({ 
    productsState: productsReducer, 
    authState: authReducer,
    usersState: usersReducer,
    categoriesState: categoriesReducer,
    cartsState: cartsReducer,
    ordersState: ordersReducer,
    itemsState: itemsReducer,
    bookedDatesState: bookedDatesReducer
});

const store = createStore(reducers);

export default store;