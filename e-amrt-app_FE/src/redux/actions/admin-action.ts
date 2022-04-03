import { Order, PerfumeErrors, User } from "../../types/types";
import { FetchAllOrderSuccessActionType, FetchAllUserSuccessActionType, FetchOrdersUserSuccessActionType, FetchUserInfoSuccessActionType, FETCH_ALL_ORDER_SUCCESS, FETCH_ALL_USER_SUCCESS, FETCH_ORDERS_USER_SUCCESS, FETCH_USER_INFO_SUCCESS, LoadingDataActionType, LOADING_DATA, PerfumeAddedFailureActionType, PerfumeAddedSuccessActionType, PerfumeUpdatedFailureActionType, PerfumeUpdatedSuccessActionType, PERFUME_ADDED_FAILURE, PERFUME_ADDED_SUCCESS, PERFUME_UPDATED_FAILURE, PERFUME_UPDATED_SUCCESS } from "../action-types/admin-action-types";

export const loadData = (): LoadingDataActionType => ({
    type: LOADING_DATA
})

export const perfumeAddedSuccess = (): PerfumeAddedSuccessActionType => ({
    type: PERFUME_ADDED_SUCCESS
})

export const perfumeAddedFailure = (perfumeErrors: PerfumeErrors): PerfumeAddedFailureActionType => ({
    type: PERFUME_ADDED_FAILURE,
    payload: perfumeErrors
})

export const perfumeUpdatedSuccess = (): PerfumeUpdatedSuccessActionType => ({
    type: PERFUME_UPDATED_SUCCESS
})

export const perfumeUpdatedFailure = (perfumeErrors: PerfumeErrors): PerfumeUpdatedFailureActionType => ({
    type: PERFUME_UPDATED_FAILURE,
    payload: perfumeErrors
})


export const FetchAllUserSuccess = (users: Array<Partial<User>>): FetchAllUserSuccessActionType => ({
    type: FETCH_ALL_USER_SUCCESS,
    payload: users
})

export const FetchUserInfoSuccess = (user: Partial<User>): FetchUserInfoSuccessActionType => ({
    type: FETCH_USER_INFO_SUCCESS,
    payload: user
})

export const fetchOrdersUserSuccess = (orders: Array<Order>): FetchOrdersUserSuccessActionType => ({
    type: FETCH_ORDERS_USER_SUCCESS,
    payload: orders
})

export const fetchAllOrderSuccess = (orders: Array<Order>): FetchAllOrderSuccessActionType => ({
    type: FETCH_ALL_ORDER_SUCCESS,
    payload: orders
})