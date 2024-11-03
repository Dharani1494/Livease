import axios from "axios";
import {
    GET_ERRORS,
    FLAT_ADD,
    FLAT_UPDATE
} from "./types";

export const addFlat = (flatData, history) => dispatch => {
    axios
        .post("/api/flat-add", flatData)
        .then(res =>
            dispatch({
                type: FLAT_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updateFlat = (flatData) => dispatch => {
    axios
        .post("/api/flat-update", flatData)
        .then(res =>
            dispatch({
                type: FLAT_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
