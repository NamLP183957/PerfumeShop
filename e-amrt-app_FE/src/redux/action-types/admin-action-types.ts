import { Order, PerfumeErrors, User } from "../../types/types"

export const LOADING_DATA = "LOADING_DATA"
export const PERFUME_ADDED_SUCCESS = "PERFUME_ADDED_SUCCESS"
export const PERFUME_ADDED_FAILURE = "PERFUME_ADDED_FAILURE"
export const PERFUME_UPDATED_SUCCESS = "PERFUME_UPDATED_SUCCESS"
export const PERFUME_UPDATED_FAILURE = "PERFUME_UPDATED_FAILURE"
export const FETCH_ALL_USER_SUCCESS = "FETCH_ALL_USER_SUCCESS"
export const FETCH_USER_INFO_SUCCESS = "FETCH_USER_INFO_SUCCESS"
export const FETCH_ORDERS_USER_SUCCESS = "FETCH_ORDERS_USER_SUCCESS"
export const FETCH_ALL_ORDER_SUCCESS = "FETCH_ALL_ORDER_SUCCESS";

export type LoadingDataActionType = {
    type: typeof LOADING_DATA
}

export type PerfumeAddedSuccessActionType = {
    type: typeof PERFUME_ADDED_SUCCESS
}

export type PerfumeAddedFailureActionType = {
    type: typeof PERFUME_ADDED_FAILURE,
    payload: PerfumeErrors
}

export type PerfumeUpdatedSuccessActionType = {
    type: typeof PERFUME_UPDATED_SUCCESS
}

export type PerfumeUpdatedFailureActionType = {
    type: typeof PERFUME_UPDATED_FAILURE,
    payload: PerfumeErrors
}

export type FetchAllUserSuccessActionType = {
    type: typeof FETCH_ALL_USER_SUCCESS, 
    payload: Array<Partial<User>>
};

export type FetchUserInfoSuccessActionType = {
    type: typeof FETCH_USER_INFO_SUCCESS,
    payload: Partial<User>
}

export type FetchOrdersUserSuccessActionType = {
    type: typeof FETCH_ORDERS_USER_SUCCESS,
    payload: Array<Order>
}

export type FetchAllOrderSuccessActionType = {
    type: typeof FETCH_ALL_ORDER_SUCCESS;
    payload: Array<Order>
}

export type AdminActionType = LoadingDataActionType | PerfumeAddedSuccessActionType
    | PerfumeAddedFailureActionType | PerfumeUpdatedFailureActionType
    | PerfumeUpdatedSuccessActionType | FetchAllUserSuccessActionType
    | FetchUserInfoSuccessActionType | FetchOrdersUserSuccessActionType
    | FetchAllUserSuccessActionType;