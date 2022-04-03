import { LoginFailureActionType, LoginSuccessActionType, LOGIN_FAILURE, LOGIN_SUCCESS } from "../action-types/auth-action-types";


export const loginSuccess = (userRole: string) : LoginSuccessActionType => ({
    type: LOGIN_SUCCESS,
    payload: userRole
})

export const loginFailure = (error: string) : LoginFailureActionType => ({
    type: LOGIN_FAILURE,
    payload: error
})