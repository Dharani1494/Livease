const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateFacilityInput(data) {
    let errors = {};
    data.facilityId = !isEmpty(data.facilityId) ? data.facilityId : "";
    data.facilityName = !isEmpty(data.facilityName) ? data.facilityName : "";
    data.facilityManager = !isEmpty(data.facilityManager) ? data.facilityManager : "";
    data.facilityManagerNumber = !isEmpty(data.facilityManagerNumber) ? data.facilityManagerNumber : "";
    data.numberofPersonsAllowed = !isEmpty(data.numberofPersonsAllowed) ? data.numberofPersonsAllowed : "";
    if (Validator.isEmpty(data.facilityId)) {
        errors.facilityId = "ID field is required";
    }
    if (Validator.isEmpty(data.facilityName)) {
        errors.facilityName = "facilityName field is required";
    }
    if (Validator.isEmpty(data.facilityManager)) {
        errors.facilityManager = "facilityManager field is required";
    }
    if (Validator.isEmpty(data.facilityManagerNumber)) {
        errors.facilityManagerNumber = "facilityManagerNumber field is required";
    }
    if (Validator.isEmpty(data.numberofPersonsAllowed)) {
        errors.numberofPersonsAllowed = "numberofPersonsAllowed field is required";
    }
    if (!Validator.isLength(data.facilityManagerNumber, { min: 10, max: 10 })) {
        errors.facilityManagerNumber = "Should be 10 digit";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};