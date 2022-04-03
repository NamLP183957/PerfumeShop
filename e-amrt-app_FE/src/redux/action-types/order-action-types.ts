import { Order, OrderError } from "../../types/types";

export const ORDER_ADDED_SUCCESS = "ORDER_ADDED_SUCCESS";
export const ORDER_ADDED_FAILURE = "ORDER_ADDED_FAILURE";
export const SHOW_LOADER = "SHOW_LOADER";

export type OrderAddedSuccessActionType = {
    type: typeof ORDER_ADDED_SUCCESS,
    payload: Order
}

export type OrderAddedFailureActionType = {
    type: typeof ORDER_ADDED_FAILURE,
    payload: OrderError
}

export type ShowLoaderActionType = {
    type: typeof SHOW_LOADER
}

export type OrderActionType = OrderAddedSuccessActionType | OrderAddedFailureActionType
| ShowLoaderActionType;