import { Dispatch } from "redux";
import {loadingCart, caculateCartPrice, fetchCartSuccess, stopLoadingCart, clearCartSuccess} from '../actions/cart-action'
import RequestService from '../../utils/request-service'
import { Perfume } from "../../types/types";

export const fetchCart = (data: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingCart());
    const response = await RequestService.post("/users/cart", data);
    const perfumes: Map<number, number> = new Map(JSON.parse(localStorage.getItem("perfumes") as string));
    let total = 0;

    perfumes.forEach((value: number, key: number) => {
        const perfume: Perfume = response.data.find((perfume: {id: number}) => perfume.id === key);
        total += perfume.price * value;
    })

    dispatch(caculateCartPrice(total));
    dispatch(fetchCartSuccess(response.data));
}

export const caculateTotalPrice = (perfumes: Array<Perfume> | any) =>async (dispatch: Dispatch) => {
    const perfumeFromLocalStorage: Map<number, number> = new Map(JSON.parse(localStorage.getItem("perfumes") as string));
    let total = 0;
    perfumeFromLocalStorage.forEach((value: number, key: number) => {
        const perfume: Perfume = perfumes.find((perfume: {id: number}) => perfume.id === key);
        total += perfume.price * value;
    })

    dispatch(caculateCartPrice(total));
}

export const loadCart = () => async (dispatch: Dispatch) => {
    dispatch(stopLoadingCart());
}

export const clearCart = () =>async (dispatch: Dispatch) => {
    dispatch(clearCartSuccess())
}

