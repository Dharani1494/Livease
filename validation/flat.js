const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateFlatInput(data) {
    let errors = {};
    data.flatNumber = !isEmpty(data.flatNumber) ? data.flatNumber : "";
    data.flatOwnerName = !isEmpty(data.flatOwnerName) ? data.flatOwnerName : "";
    data.flatOwnerNumber = !isEmpty(data.flatOwnerNumber) ? data.flatOwnerNumber : "";
    data.flatOwnerProfession = !isEmpty(data.flatOwnerProfession) ? data.flatOwnerProfession : "";
    if (Validator.isEmpty(data.flatNumber)) {
        errors.flatNumber = "Name field is required";
    }
    if (Validator.isEmpty(data.flatOwnerName)) {
        errors.flatOwnerName = "flatOwnerName field is required";
    }
    if (Validator.isEmpty(data.flatOwnerNumber)) {
        errors.flatOwnerNumber = "flatOwnerNumber field is required";
    }
    if (Validator.isEmpty(data.flatOwnerProfession)) {
        errors.flatOwnerProfession = "flatOwnerProfession field is required";
    }
    if (!Validator.isLength(data.flatOwnerNumber, { min: 10, max: 10 })) {
        errors.flatOwnerNumber = "Should be 10 digit";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};