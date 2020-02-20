const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    polls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]
}); 

userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        const hashed = await bcrypt.hash(this.password, 10)
        this.password = hashed;
        return next()
    } catch(err){
        return next(err)
    }
})

userSchema.methods.comparePassword = async function(attempt, next){
    try{
        return await bcrypt.compare(attempt, this.password);
    } catch(err){
        return next(err)
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User