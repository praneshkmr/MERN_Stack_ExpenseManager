var mongoose = require('mongoose');

var ExpenseSchema = mongoose.Schema({
    title: String,
    amount: Number,
    date: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    user: mongoose.Schema.Types.ObjectId,
    isDeleted : { type: Boolean, default: false }
});
mongoose.model('ExpenseModel', ExpenseSchema);

var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
mongoose.model('UserModel', UserSchema);