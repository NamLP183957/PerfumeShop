import { Dispatch } from "redux";
import requestService from "../../utils/request-service";
import * as Ad from '../actions/admin-action'
import { getPerfumes } from "../actions/perfume-action";

export const addPerfume = (data: FormData) =>async (dispatch: Dispatch) => {
    try {
        const response = await requestService.post("/admin/add", data, true, "multipart/form-data");
        console.log("response: ", response);
        dispatch(Ad.perfumeAddedSuccess());
    } catch (error) {
        dispatch(Ad.perfumeAddedFailure(error.response.data))
    }
}

export const updatePerfume = (data: FormData) =>async (dispatch: Dispatch) => {
    try {
        const response = await requestService.put("/admin/update", data, true, "multipart/form-data");
        dispatch(Ad.perfumeAddedSuccess());
    } catch (error) {
        dispatch(Ad.perfumeUpdatedFailure(error.response.data))
    }
}

export const deletePerfume = (id?: number) =>async (dispatch: Dispatch) => {
    const response = await requestService.delete("/admin/delete/" + id, true);
    dispatch(getPerfumes(response.data));
}

export const fetchAllUser = () =>async (dispatch: Dispatch) => {
    dispatch(Ad.loadData());
    const response = await requestService.get("/admin/users/all", true);
    dispatch(Ad.FetchAllUserSuccess(response.data));   
}

export const fetchUserInfo = (id: string) =>async (dispatch: Dispatch) => {
    dispatch(Ad.loadData());
    const response = await requestService.get("/admin/users/" + id, true);
    dispatch(Ad.FetchUserInfoSuccess(response.data));
}

export const fetchOrdersUser = (email: string | undefined) =>async (dispatch: Dispatch) => {
    dispatch(Ad.loadData());
    const response = await requestService.post("/admin/orders", {email: email}, true);
    dispatch(Ad.fetchOrdersUserSuccess(response.data));
}