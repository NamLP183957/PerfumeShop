import { Dispatch } from "redux";
import { ReviewData, UserEdit } from "../../types/types";
import RequestService from '../../utils/request-service'
import {fetchPerfumeSuccess} from '../actions/perfume-action'
import {userAddedReviewSuccess, userAddedReviewFailure, resetInputForm, fetchUserInfoSuccess, fetchUserInfoFailure, loadingUserInfo, userUpdatedFailure, userUpdatedSuccess} from '../actions/user-action'

export const addReviewToPerfume = (review: ReviewData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post("/users/review", review);
        dispatch(fetchPerfumeSuccess(response.data));
        dispatch(userAddedReviewSuccess());
    } catch (error) {
        dispatch(userAddedReviewFailure(error.response.data))
    }
}

export const resetForm = () => (dispatch: Dispatch) => {
    dispatch(resetInputForm());
}

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingUserInfo());
        const response = await RequestService.get("/users/info", true);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userRole", response.data.roles);
        localStorage.setItem("isLoggedIn", "true");
        dispatch(fetchUserInfoSuccess(response.data));
    } catch (error) {
        dispatch(fetchUserInfoFailure(error));
    }
}

export const updateUserInfo = (userEdit: UserEdit) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put("/users/edit", userEdit, true);
        dispatch(userUpdatedSuccess(response.data));
    } catch (error) {
        dispatch(userUpdatedFailure(error.response.data))
    }
}