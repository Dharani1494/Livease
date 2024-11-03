import axios from "axios";
import {
    GET_ERRORS,
    EMPLOYEE_ADD,
    EMPLOYEE_UPDATE
} from "./types";

export const addEmployee = (employeeData, history) => dispatch => {
    axios
        .post("/api/employee-add", employeeData)
        .then(res =>
            dispatch({
                type: EMPLOYEE_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updateEmployee = (employeeData) => dispatch => {
    axios
        .post("/api/employee-update", employeeData)
        .then(res =>
            dispatch({
                type: EMPLOYEE_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
