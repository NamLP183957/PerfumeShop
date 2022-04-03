import { Action } from "redux";
import { Perfume, Review } from "../../types/types"
import { FETCH_PERFUMES, FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS, FETCH_PERFUMES_BY_GENDER_SUCCESS, FETCH_PERFUMES_BY_PERFUMER_SUCCESS, FETCH_PERFUMES_BY_QUERY_SUCCESS, FETCH_PERFUME_BY_QUERY_SUCCESS, FETCH_PERFUME_SUCCESS, GET_OTHER_PERFUMES_SUCCESS, LOADING_PERFUME, PerfumeActionTypes } from "../action-types/perfume-action-types";

export type InitialStateType = {
    perfumes: Array<Perfume>
    otherPerfumes: Array<Perfume>
    perfume: Partial<Perfume>
    reviews: Array<Review>
    isPerfumeLoading: boolean
}

const initialState: InitialStateType = {
    perfumes: [],
    otherPerfumes: [],
    perfume: {},
    reviews: [],
    isPerfumeLoading: false
}

const reducer = (state: InitialStateType = initialState, action: PerfumeActionTypes): InitialStateType => {
    switch (action.type) {
        case LOADING_PERFUME:
            return { ...state, isPerfumeLoading: true };

        case FETCH_PERFUMES:
            return { ...state, perfumes: action.payload, isPerfumeLoading: false };

        case FETCH_PERFUMES_BY_QUERY_SUCCESS:
            return { ...state, perfumes: action.payload, isPerfumeLoading: false };

        case FETCH_PERFUME_SUCCESS:
            return { ...state, perfume: action.payload, reviews: action.payload.reviews, isPerfumeLoading: false };


        case FETCH_PERFUME_BY_QUERY_SUCCESS:
            return { ...state, perfume: action.payload, reviews: action.payload.reviews, isPerfumeLoading: false };

        case FETCH_PERFUMES_BY_GENDER_SUCCESS:
            return { ...state, perfumes: action.payload, isPerfumeLoading: false };

        case FETCH_PERFUMES_BY_PERFUMER_SUCCESS:
            return { ...state, perfumes: action.payload, isPerfumeLoading: false };

        case FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS:
            return { ...state, perfumes: action.payload, isPerfumeLoading: false };

        case GET_OTHER_PERFUMES_SUCCESS:
            return { ...state, otherPerfumes: action.payload, isPerfumeLoading: false};

        default:
            return initialState;
    }
}

export default reducer;