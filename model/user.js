var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var schema = mongoose.Schema;

var userschema = new schema({
    email: String,
    password: String
});

userschema.pre('save', async function (next) {
    try {
        var salt = await bcrypt.genSalt(10);
        var passwordhash = await bcrypt.hash(this.password, salt);
        this.password = passwordhash;
        next();
    }
    catch (err) {
        next(err);
    }
});

userschema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

var User = mongoose.model('user', userschema);

module.exports = User;

