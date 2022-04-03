import { Order, PerfumeErrors, User } from "../../types/types"
import { AdminActionType, FETCH_ALL_ORDER_SUCCESS, FETCH_ALL_USER_SUCCESS, FETCH_ORDERS_USER_SUCCESS, FETCH_USER_INFO_SUCCESS, LOADING_DATA, PERFUME_ADDED_FAILURE, PERFUME_ADDED_SUCCESS, PERFUME_UPDATED_FAILURE, PERFUME_UPDATED_SUCCESS } from "../action-types/admin-action-types"

export type InitialStateType = {
    users: Array<Partial<User>>
    user: Partial<User>
    orders: Array<Order>
    ordersUser: Array<Order>
    errors: Partial<PerfumeErrors>
    isPerfumeUpdated: boolean
    isPerfumeAdded: boolean
    isLoaded: boolean
}

const initialState: InitialStateType = {
    users: [],
    user: {},
    orders: [],
    ordersUser: [],
    errors: {},
    isPerfumeUpdated: false,
    isPerfumeAdded: false,
    isLoaded: false
}

const reducer = (state: InitialStateType = initialState, action: AdminActionType): InitialStateType => {
    switch (action.type) {
        case LOADING_DATA:
            return {...state, isLoaded: true};
        
        case PERFUME_ADDED_SUCCESS:
            return {...state, isPerfumeAdded: true, errors: {}};

        case PERFUME_ADDED_FAILURE:
            return {...state, isPerfumeAdded: false, errors: action.payload};

        case PERFUME_UPDATED_SUCCESS:
            return {...state, isPerfumeUpdated: true, errors: {}};

        case PERFUME_UPDATED_FAILURE:
            return {...state, isPerfumeUpdated: false, errors: action.payload};
            
        case FETCH_ALL_USER_SUCCESS:
            return {...state, users: action.payload, isLoaded: false};

        case FETCH_USER_INFO_SUCCESS:
            return {...state, isLoaded: false, user: action.payload};

        case FETCH_ORDERS_USER_SUCCESS:
            return {...state, isLoaded: false, ordersUser: action.payload};

        case FETCH_ALL_ORDER_SUCCESS:
            return {...state, isLoaded: false, orders: action.payload};

        default: 
            return state;
    }
}

export default reducer;