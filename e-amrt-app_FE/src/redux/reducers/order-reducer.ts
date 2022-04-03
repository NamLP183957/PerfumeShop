import { Order, OrderError } from "../../types/types"
import { OrderActionType, ORDER_ADDED_FAILURE, ORDER_ADDED_SUCCESS, SHOW_LOADER } from "../action-types/order-action-types"

export type InitialStateType = {
    order: Partial<Order>
    orders: Array<Order>
    errors: Partial<OrderError>
    loading: boolean
}

const initialState: InitialStateType = ({
    order: {},
    orders: [],
    errors: {},
    loading: false
})

const reducer = (state: InitialStateType = initialState, action: OrderActionType): InitialStateType => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true};
        case ORDER_ADDED_SUCCESS: 
            return {...state, order: action.payload, loading: false};
        case ORDER_ADDED_FAILURE:
            return {...state, errors: action.payload, loading: false};
        default:
            return state;
    }
}

export default reducer