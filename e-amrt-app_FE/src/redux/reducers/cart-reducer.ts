import { Perfume } from "../../types/types"
import { CACULATE_CART_PRICE, CartActionTypes, CLEAR_CART_SUCCESS, FETCH_CART_SUCCESS, LOADING_CART, STOP_LOADING_CART } from "../action-types/cart-action-types"

export type InitialStateType = {
    perfumes: Array<Perfume>
    loading: boolean
    totalPrice: number
}

const initialState: InitialStateType = ({
    perfumes: [],
    loading: false,
    totalPrice: 0
})

const reducer = (state: InitialStateType = initialState, action: CartActionTypes): InitialStateType => {
    switch (action.type) {
        case LOADING_CART:
            return { ...state, loading: true };
        case STOP_LOADING_CART:
            return { ...state, loading: false, perfumes: [] };
        case CACULATE_CART_PRICE:
            return { ...state, totalPrice: action.payload, loading: false };
        case FETCH_CART_SUCCESS:
            return { ...state, perfumes: action.payload, loading: false };
        case CLEAR_CART_SUCCESS:
            return { ...state, perfumes: [] };
        default:
            return state;
    }
}

export default reducer;