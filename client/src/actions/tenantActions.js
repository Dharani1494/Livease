import axios from "axios";
import {
    GET_ERRORS,
    TENANT_ADD,
    TENANT_UPDATE
} from "./types";

export const addTenant = (tenantData, history) => dispatch => {
    axios
        .post("/api/tenant-add", tenantData)
        .then(res =>
            dispatch({
                type: TENANT_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updateTenant = (tenantData) => dispatch => {
    axios
        .post("/api/tenant-update", tenantData)
        .then(res =>
            dispatch({
                type: TENANT_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
