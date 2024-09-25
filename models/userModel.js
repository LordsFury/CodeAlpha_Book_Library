const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    book: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }]
})

module.exports = mongoose.model("User", UserSchema);