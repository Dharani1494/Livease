const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    phoneNumber: {
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

EmployeeSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

EmployeeSchema.set('toJSON', {
    virtuals: true
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
