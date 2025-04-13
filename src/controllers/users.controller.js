import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import {cloudinaryUploder} from '../utils/cloudinary.js';
import { ApiResponse } from "../utils/apiResponse.js";
const registerUser = asyncHandler(async(req,res)=>{
   // get user details from frontend
   // validation is empty 
   // check is user already exists : username, email
   // check for images,check for avatar
   // upload them to cloudinary, avatar
   // create user object - create entry in db
   // remove password and refresh token from response
   // check for user creation
   // return res

   const {username,email,fullName,password } = req.body

   //validation
   if(
      [fullName,email,username,password].some((field)=>
      field?.trim()==="")
   ){
      throw new ApiError(400,"All fields are required")
   }

   const exisitedUser = await User.findOne({
      $or : [{username},{email}]
   })

   if(exisitedUser){
      throw new ApiError(409,"User already exists")
   }
   
   const avatarLocalPath = req.files?.avatar[0]?.path
   
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if(!avatarLocalPath){
      throw new ApiError(400,"Avatar file is required");
   }
   const avatar = await cloudinaryUploder(avatarLocalPath);
   console.log(avatar);
   const coverImage = await cloudinaryUploder(coverImageLocalPath);

   if(!avatar){
      throw new ApiError(400,"Avatar file is required")
   }

   const user  = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage:coverImage?.url||"",
      email,
      password,
      username:username.toLowerCase()
   })
   const createduser = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   if(!createduser){
      throw new ApiError(500,"Something went wrong try again")
   }
   return res.status(201).json(new ApiResponse(200,createduser,"User registered Succesfully"))
   
})

export {registerUser};