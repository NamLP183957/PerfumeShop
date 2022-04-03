import { Perfume } from "../../types/types";
import { CaculateCartPriceActionType, CACULATE_CART_PRICE, ClearCartSuccessActionType, CLEAR_CART_SUCCESS, FetchCartSuccessActionType, FETCH_CART_SUCCESS, LoadingCartActionType, LOADING_CART, StopLoadingCartActionType, STOP_LOADING_CART } from "../action-types/cart-action-types";

export const loadingCart = (): LoadingCartActionType => ({
    type: LOADING_CART
})

export const stopLoadingCart = (): StopLoadingCartActionType => ({
    type: STOP_LOADING_CART
})

export const caculateCartPrice = (total: number): CaculateCartPriceActionType => ({
    type: CACULATE_CART_PRICE,
    payload: total
})

export const fetchCartSuccess = (perfumes: Array<Perfume>): FetchCartSuccessActionType => ({
    type: FETCH_CART_SUCCESS,
    payload: perfumes
})

export const clearCartSuccess = (): ClearCartSuccessActionType => ({
    type: CLEAR_CART_SUCCESS
})