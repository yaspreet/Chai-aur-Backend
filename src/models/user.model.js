import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "video",
    }],
    password: {
        type: String,
        required: [true, 'Password is required ']
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign({
        _id: this.id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({
        _id: this.id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },  
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
        }
    )

}
export const User = mongoose.model('User', userSchema);
