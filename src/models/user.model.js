import mongoose,{Schema} from "mongoose";
import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new Schema({
    username : {
        type : String,
        requird : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        requird : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullname : {
        type : String,
        requird : true,
        lowercase : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String, //cloudinary url
        requird : true
    },
    coverImage : {
        type : String,
    },
    watchHistory :[
        {
            type : Schema.Types.ObjectId,
            ref : "video"
        }
    ],
    password : {
        type : String,
        requird : [true,'Password is required']
    },
    refreshToken : {
        type : String
    }
},{timestamps: true})

userSchema.pre("save",async function(next){
    if(!userSchema.isModified("password")) return next();
    this.password= await bcrpyt.hash(this.password,10);
    next();
})
userSchema.methods.isPasswordCorrect=async function(password) {
    return await bcrpyt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id : this._id,
        username : this.username,
        email : this.email,
    },
    process.env.ACCESS_TOKEN,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN,
    { 
        expiresIn :process.env.ACCESS_TOKEN_EXPIRY
    })
}
export const User = mongoose.model("User",userSchema);