
import { Dispatch } from "redux";
import { FilterParamType, Perfume } from "../../types/types";
import { getAllPerfumesByQuery, getPerfumeByQuery, getPerfumesByIdsQuery } from "../../utils/grapql-query/perfume-query";
import requestService from "../../utils/request-service";
import { getPerfumes, fetchPerfumeSuccess, loadingPerfume, fetchPerfumesByFilterParamsSuccess, fetchPerfumesByGenderSuccess, fetchPerfumesByPerfumerSuccess, fetchPerfumesByQuerySuccess, fetchPerfumeByQuerySuccess, getOtherPerfumersSuccess } from "../actions/perfume-action";

export const fetchPerfumes = () => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.get("/perfumes");
    dispatch(getPerfumes(response.data));

}

export const fetchPerfume = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.get(`/perfumes/${id}`);
    dispatch(fetchPerfumeSuccess(response.data));
}

export const fetchPerfumesByIds = (ids: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.post(`/perfumes/ids`, ids);
    dispatch(getPerfumes(response.data));
}

export const fetchPerfumesByFilterParams = (filter: FilterParamType) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.post("/perfumes/search", filter);
    dispatch(fetchPerfumesByFilterParamsSuccess(response.data));
}

export const fetchPerfumesByGender = (gender: { perfumeeGender: string }) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.post("/perfumes/search/gender", gender);
    dispatch(fetchPerfumesByGenderSuccess(response.data));
}

export const fetchPerfumesByPerfumer = (perfumer: { perfumer: string }) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.post("/perfumes/search/perfumer", perfumer);
    dispatch(fetchPerfumesByPerfumerSuccess(response.data));
}

export const fetchPerfumeReviews = (response: Perfume) => async (dispatch: Dispatch) => {
    dispatch(fetchPerfumeSuccess(response));
}

export const getOtherPerfumes = (perfumeId: string) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.get(`/perfumes/other-perfumes/` +  perfumeId);
    dispatch(getOtherPerfumersSuccess(response.data));
}

// GrapQL thunks

export const fetchPerfumesByQuery = () => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.post("/perfumes/graphql/perfumes", { query: getAllPerfumesByQuery });
    dispatch(fetchPerfumesByQuerySuccess(response.data.data.perfumes));
}

export const fetchPerfumeByQuery = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.post("/perfumes/graphql/perfume", { query: getPerfumeByQuery(id) });
    dispatch(fetchPerfumeByQuerySuccess(response.data.data.perfume));
}

export const fetchPerfumesByIdsQuery = (ids: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingPerfume());
    const response = await requestService.post("/perfumes/graphql/ids", { query: getPerfumesByIdsQuery(ids) });
    dispatch(fetchPerfumesByQuerySuccess(response.data.data.perfumesIds));
}