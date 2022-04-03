import { AuthErrors, User } from "../../types/types"
import { AuthActionType, LOGIN_FAILURE, LOGIN_SUCCESS } from "../action-types/auth-action-types"

export type InitialStateType = {
    user: Partial<User>,
    userEmail: string | null,
    userRole: string | null,
    isRegistered: boolean,
    loading: boolean,
    success: string,
    error: string,
    errors: Partial<AuthErrors>
}

const initialState: InitialStateType = {
    user: {},
    userEmail: "",
    userRole: "",
    isRegistered: false,
    loading: false,
    success: "",
    error: "",
    errors: {}
}

const reducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, userRole: action.payload};

        case LOGIN_FAILURE:
            return {...state, error: action.payload};
        
        default: 
            return state;
    }
}

export default reducer;