import { combineReducers } from "redux";
import authReducer from './auth-reducer'
import userReducer from './user-reducer'
import perfumeReducer from './perfume-reducer'
import cartReducer from './cart-reducer'
import orderReducer from './order-reducer'
import adminReducer from './admin-reducer'

const rootReducer = combineReducers({
    admin: adminReducer,
    auth: authReducer,
    user: userReducer,
    perfume: perfumeReducer,
    cart: cartReducer,
    order: orderReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default rootReducer;