import { Dispatch } from "redux";
import requestService from "../../utils/request-service";
import { OrderAddedFailure, OrderAddedSuccess, ShowLoader } from "../actions/order-action";

export const addOrder = (order: any, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(ShowLoader());
        const response = await requestService.post("/users/order", order);
        localStorage.removeItem("perfumes");
        dispatch(OrderAddedSuccess(response.data));
        history.push("/order/finalize");
    } catch (error) {  
        dispatch(OrderAddedFailure(error.response?.data));
    }
}