var JWT = require('jsonwebtoken');

var User = require('../model/user');
var { JWT_SECRET } = require('../configuration/index')

SignToken = user => {
    return JWT.sign({
        iss: 'MohamedHanif',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    signIn: async (req, res, next) => {
        const tokens = SignToken(req.user);
        res.json({ tokens });

    },
    signUp: async (req, res, next) => {
        var { email, password } = req.value.body;
        var foundUser = await User.findOne({ email: email });
        if (foundUser) {
            return res.status(403).json({ err: 'User already exist' });
        }
        var newUser = new User({
            email: email,
            password: password
        });

        await newUser.save();
        var tokens = SignToken(newUser);

        res.json({
            tokens
        });
    },
    secret: async (req, res, next) => {
        console.log('Secret is working');
        res.status(200).json({ secret: 'Secret is authorized' });
    }
};