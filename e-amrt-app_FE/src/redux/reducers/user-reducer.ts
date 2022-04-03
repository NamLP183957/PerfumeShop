import { ReviewError, User, UserEditError } from "../../types/types"
import { FETCH_USER_INFO_FAILURE, FETCH_USER_INFO_SUCCESS, LOADING_USER_INFO, RESET_INPUT_FORM, UserActionType, USER_ADDED_REVIEW_FAILURE, USER_ADDED_REVIEW_SUCCESS, USER_UPDATED_FAILURE, USER_UPDATED_SUCCESS } from "../action-types/user-action-types"

export type InitialStateType = {
    user: Partial<User>
    isLoggedIn: boolean
    isLoaded: boolean
    successMessage: string
    userEditErrors: Partial<UserEditError>
    reviewErrors: Partial<ReviewError>
    isReviewAdded: boolean
}

const initialState: InitialStateType = {
    user: {},
    isLoggedIn: false,
    isLoaded: false,
    successMessage: "",
    userEditErrors: {},
    reviewErrors: {},
    isReviewAdded: false
}

const reducer = (state: InitialStateType = initialState, action: UserActionType) => {
    switch (action.type) {
        case LOADING_USER_INFO:
            return { ...state, isLoaded: true };

        case USER_ADDED_REVIEW_SUCCESS:
            return { ...state, reviewErrors: {}, isReviewAdded: true };

        case USER_ADDED_REVIEW_FAILURE:
            return { ...state, reviewErrors: action.payload, isReviewAdded: false };

        case RESET_INPUT_FORM:
            return { ...state, successMessage: "", reviewErrors: {} }

        case FETCH_USER_INFO_SUCCESS:
            return { ...state, user: action.payload, isLoaded: false }

        case FETCH_USER_INFO_FAILURE:
            return { ...state, isLoaded: false }

        case USER_UPDATED_SUCCESS:
            return { ...state, user: action.payload, userEditErrors: {} }

        case USER_UPDATED_FAILURE:
            return { ...state, userEditErrors: action.payload };

        default:
            return state;
    }
}

export default reducer;