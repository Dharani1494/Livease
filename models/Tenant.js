const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TenantSchema = new Schema({
    tenantId: {
        type: String,
        required: true
    },
    tenantName: {
        type: String,
        required: true
    },
    flats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flat',
        required: true  
    },
    phoneNumber: {
        type: String,
        required: true  
    },
    numberOfPeople: {
        type: String,
        required: true  
    },
    profession: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

TenantSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

TenantSchema.set('toJSON', {
    virtuals: true
});

module.exports = Tenant = mongoose.model("Tenant", TenantSchema);
