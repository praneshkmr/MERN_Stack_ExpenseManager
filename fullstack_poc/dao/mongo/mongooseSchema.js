var mongoose = require('mongoose');

var ExpenseSchema = mongoose.Schema({
    title: String,
    amount: Number,
    date: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    user: mongoose.Schema.Types.ObjectId
});
var ExpenseModel = mongoose.model('ExpenseModel', ExpenseSchema);