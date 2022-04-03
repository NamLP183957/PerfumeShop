import { ReviewError, User, UserEditError } from "../../types/types";

export const LOADING_USER_INFO = "LOADING_USER_INFO";
export const USER_ADDED_REVIEW_SUCCESS = "USER_ADDED_REVIEW_SUCCESS";
export const USER_ADDED_REVIEW_FAILURE = "USER_ADDED_REVIEW_FAILURE";
export const RESET_INPUT_FORM = "RESET_INPUT_FORM";
export const FETCH_USER_INFO_SUCCESS = "FETCH_USER_INFO_SUCCESS";
export const FETCH_USER_INFO_FAILURE = "FETCH_USER_INFO_FAILURE";
export const USER_UPDATED_SUCCESS = "USER_UPDATED_SUCCESS";
export const USER_UPDATED_FAILURE = "USER_UPDATED_FAILURE";

export type LoadingUserInfoActionType = {type: typeof LOADING_USER_INFO};
export type UserAddedReviewSuccessActionType = {type: typeof USER_ADDED_REVIEW_SUCCESS }
export type UserAddedReviewFailureActionType = {type: typeof USER_ADDED_REVIEW_FAILURE, payload: ReviewError}
export type ResetInputFormActionType = {type: typeof RESET_INPUT_FORM};
export type FetchUserInfoSuccessActionType = {type: typeof FETCH_USER_INFO_SUCCESS, payload: User};
export type FetchUserInfoFailureActionType = {type: typeof FETCH_USER_INFO_FAILURE, payload: string};
export type UserUpdatedSuccessActionType = {type: typeof USER_UPDATED_SUCCESS, payload: User};
export type UserUpdatedFailureActionType = {type: typeof USER_UPDATED_FAILURE, payload: UserEditError};

export type UserActionType = LoadingUserInfoActionType 
| UserAddedReviewSuccessActionType | UserAddedReviewFailureActionType
| ResetInputFormActionType | FetchUserInfoFailureActionType
| FetchUserInfoSuccessActionType | UserUpdatedSuccessActionType
| UserUpdatedFailureActionType ;