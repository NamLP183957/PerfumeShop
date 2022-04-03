import { ReviewError, User, UserEditError } from "../../types/types";
import { FetchUserInfoFailureActionType, FetchUserInfoSuccessActionType, FETCH_USER_INFO_FAILURE, FETCH_USER_INFO_SUCCESS, LoadingUserInfoActionType, LOADING_USER_INFO, ResetInputFormActionType, RESET_INPUT_FORM, UserAddedReviewFailureActionType, UserAddedReviewSuccessActionType, UserUpdatedFailureActionType, UserUpdatedSuccessActionType, USER_ADDED_REVIEW_FAILURE, USER_ADDED_REVIEW_SUCCESS, USER_UPDATED_FAILURE, USER_UPDATED_SUCCESS } from "../action-types/user-action-types";

export const loadingUserInfo = (): LoadingUserInfoActionType => ({
    type: LOADING_USER_INFO
})

export const userAddedReviewSuccess = (): UserAddedReviewSuccessActionType => ({
    type: USER_ADDED_REVIEW_SUCCESS
})

export const userAddedReviewFailure = (reviewError: ReviewError): UserAddedReviewFailureActionType => ({
    type: USER_ADDED_REVIEW_FAILURE,
    payload: reviewError
})

export const resetInputForm = (): ResetInputFormActionType => ({
    type: RESET_INPUT_FORM
})

export const fetchUserInfoSuccess = (user: User): FetchUserInfoSuccessActionType => ({
    type: FETCH_USER_INFO_SUCCESS,
    payload: user
})

export const fetchUserInfoFailure = (error: string): FetchUserInfoFailureActionType => ({
    type: FETCH_USER_INFO_FAILURE,
    payload: error
})

export const userUpdatedSuccess = (user: User): UserUpdatedSuccessActionType => ({
    type: USER_UPDATED_SUCCESS,
    payload: user
})

export const userUpdatedFailure = (error: UserEditError): UserUpdatedFailureActionType => ({
    type: USER_UPDATED_FAILURE,
    payload: error
})
