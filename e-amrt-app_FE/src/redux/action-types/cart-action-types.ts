import { type } from "os";
import { Perfume } from "../../types/types";

export const LOADING_CART = "LOADING_CART";
export const STOP_LOADING_CART = "STOP_LOADING_CART";
export const CACULATE_CART_PRICE = "CACULATE_CART_PRICE";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const CLEAR_CART_SUCCESS = "CLEAR_CART_SUCCESS";

export type LoadingCartActionType = {
    type: typeof LOADING_CART
}

export type StopLoadingCartActionType = {
    type: typeof STOP_LOADING_CART
}

export type CaculateCartPriceActionType = {
    type: typeof CACULATE_CART_PRICE
    payload: number
}

export type FetchCartSuccessActionType = {
    type: typeof FETCH_CART_SUCCESS
    payload: Array<Perfume>
}

export type ClearCartSuccessActionType = {
    type: typeof CLEAR_CART_SUCCESS
}

export type CartActionTypes = LoadingCartActionType | StopLoadingCartActionType
| CaculateCartPriceActionType | FetchCartSuccessActionType | ClearCartSuccessActionType;