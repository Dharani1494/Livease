const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FacilitySchema = new Schema({
    facilityId: {
        type: String,
        required: true
    },
    facilityName: {
        type: String,
        required: true
    },
    facilityManager: {
        type: String,
        required: true  
    },
    facilityManagerNumber: {
        type: String,
        required: true  
    },
    numberofPersonsAllowed: {
        type: String,
        required: true  
    },
    date: {
        type: Date,
        default: Date.now
    }
});

FacilitySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

FacilitySchema.set('toJSON', {
    virtuals: true
});

module.exports = Facility = mongoose.model("Facility", FacilitySchema);
