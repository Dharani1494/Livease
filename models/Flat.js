const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FlatSchema = new Schema({
    flatNumber: {
        type: String,
        required: true
    },
    flatOwnerName: {
        type: String,
        required: true
    },
    flatOwnerNumber: {
        type: String,
        required: true  
    },
    flatOwnerProfession: {
        type: String,
        required: true  
    },
    date: {
        type: Date,
        default: Date.now
    }
});

FlatSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

FlatSchema.set('toJSON', {
    virtuals: true
});

module.exports = Flat = mongoose.model("Flat", FlatSchema);
