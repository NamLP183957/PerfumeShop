

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export type LoginSuccessActionType = {type: typeof LOGIN_SUCCESS, payload: string};
export type LoginFailureActionType = {type: typeof LOGIN_FAILURE, payload: string};

export type AuthActionType = LoginFailureActionType | LoginSuccessActionType;