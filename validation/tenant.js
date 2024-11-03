const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateTenantInput(data) {
    let errors = {};
    data.tenantName = !isEmpty(data.tenantName) ? data.tenantName : "";
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
    data.numberOfPeople = !isEmpty(data.numberOfPeople) ? data.numberOfPeople : "";
    data.profession = !isEmpty(data.profession) ? data.profession : "";
    if (Validator.isEmpty(data.tenantName)) {
        errors.tenantName = "Tenant Name is required";
    }
    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "phoneNumber is required";
    }
    if (Validator.isEmpty(data.numberOfPeople)) {
        errors.numberOfPeople = "numberOfPeople field is required";
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