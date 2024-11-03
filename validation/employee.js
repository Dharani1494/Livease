const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateEmployeeInput(data) {
    let errors = {};
    data.employeeId = !isEmpty(data.employeeId) ? data.employeeId : "";
    data.employeeName = !isEmpty(data.employeeName) ? data.employeeName : "";
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
    data.profession = !isEmpty(data.profession) ? data.profession : "";
    if (Validator.isEmpty(data.employeeId)) {
        errors.employeeId = "ID field is required";
    }
    if (Validator.isEmpty(data.employeeName)) {
        errors.employeeName = "employeeName field is required";
    }
    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "phoneNumber field is required";
    }
    if (Validator.isEmpty(data.profession)) {
        errors.profession = "profession field is required";
    }
    if (!Validator.isLength(data.phoneNumber, { min: 10, max: 10 })) {
        errors.phoneNumber = "Should be 10 digit";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};