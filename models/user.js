const {Schema , model} = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = Schema({

    email:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true

    }, 
    password: {
        type: String,
        // we wont make it mandatory because we will use social login    
        minLength: 8,
        maxLength: 100
    },
    name: {
        type: String,

    }
    
}, {timestamps: true});

userSchema.methods.generateJWT = () => {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name
    }, process.env.JWT_SECRET_KEY,{expiresIn: "24d"} );
    return token;
}

module.exports.User = model('User', userSchema);

