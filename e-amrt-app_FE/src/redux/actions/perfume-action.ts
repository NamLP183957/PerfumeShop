import { Perfume } from "../../types/types";
import { FetchPerfumeByQuerySuccessActionType, FetchPerfumesByFilterParamsSuccessActionType, FetchPerfumesByGenderSuccessActionType, FetchPerfumesByPerfumerSuccessActionType, FetchPerfumesByQuerySuccessActionType, FetchPerfumeSuccessActionType, FETCH_PERFUMES, FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS, FETCH_PERFUMES_BY_GENDER_SUCCESS, FETCH_PERFUMES_BY_PERFUMER_SUCCESS, FETCH_PERFUMES_BY_QUERY_SUCCESS, FETCH_PERFUME_BY_QUERY_SUCCESS, FETCH_PERFUME_SUCCESS, GetOtherPerfumsSuccessActionType, GetPerfumesActionType, GET_OTHER_PERFUMES_SUCCESS, LoadingPerfumeActionType, LOADING_PERFUME } from "../action-types/perfume-action-types";

export const loadingPerfume = (): LoadingPerfumeActionType => ({
    type: LOADING_PERFUME
})

export const getPerfumes = (perfumes: Array<Perfume>): GetPerfumesActionType => ({
    type: FETCH_PERFUMES,
    payload: perfumes
})

export const fetchPerfumesByQuerySuccess = (perfumes: Array<Perfume>): FetchPerfumesByQuerySuccessActionType => ({
    type: FETCH_PERFUMES_BY_QUERY_SUCCESS,
    payload: perfumes
})


export const fetchPerfumeByQuerySuccess = (perfume: Perfume): FetchPerfumeByQuerySuccessActionType => ({
    type: FETCH_PERFUME_BY_QUERY_SUCCESS,
    payload: perfume
});

export const fetchPerfumeSuccess = (perfume: Perfume): FetchPerfumeSuccessActionType => ({
    type: FETCH_PERFUME_SUCCESS,
    payload: perfume
});

export const fetchPerfumesByGenderSuccess = (perfumes: Array<Perfume>): FetchPerfumesByGenderSuccessActionType => ({
    type: FETCH_PERFUMES_BY_GENDER_SUCCESS,
    payload: perfumes
});

export const fetchPerfumesByPerfumerSuccess = (perfumes: Array<Perfume>): FetchPerfumesByPerfumerSuccessActionType => ({
    type: FETCH_PERFUMES_BY_PERFUMER_SUCCESS,
    payload: perfumes
});

export const fetchPerfumesByFilterParamsSuccess = (perfumes: Array<Perfume>): FetchPerfumesByFilterParamsSuccessActionType => ({
    type: FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS,
    payload: perfumes
});

export const getOtherPerfumersSuccess = (perfumes: Array<Perfume>): GetOtherPerfumsSuccessActionType => ({
    type: GET_OTHER_PERFUMES_SUCCESS,
    payload: perfumes
})