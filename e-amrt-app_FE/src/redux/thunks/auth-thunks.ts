import { Dispatch } from "redux";
import { UserData } from "../../types/types";
import requestService from "../../utils/request-service";
import { loginFailure, loginSuccess } from "../actions/auth-action";
import { fetchUserInfoFailure, fetchUserInfoSuccess } from "../actions/user-action";
import { fetchUserInfo } from "./user-thunks";

export const login = (userData: UserData, history: any) => async (dispatch: Dispatch) => {
    try {   
        const response = await requestService.post("/auth/login", userData);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.userRole);
        localStorage.setItem("isLoggedIn", "true");
        dispatch(loginSuccess(response.data.userRole));
        
        const prevPage = localStorage.getItem("prevPage");

        if (prevPage && prevPage != "/account") {
            try {
                const response = await requestService.get("/users/info", true);
                dispatch(fetchUserInfoSuccess(response.data));
            } catch (error) {
                dispatch(fetchUserInfoFailure(error));
            }
            history.push(prevPage);
            localStorage.removeItem("prevPage");
        } else {
            history.push("/account");
        }
    } catch (error) {
        // console.error( error.response);
        dispatch(loginFailure(error.response.data));
    }
}