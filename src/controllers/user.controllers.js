import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
// import { use } from "react";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req, res) => {
    //get user details from frontend
    //validation - ot empty
    //check if user already exist: username , email
    //check for images, check for avtar
    // upload then to cloudinary , avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response

    // if request comming from form of json then we can data from req.body
    const {fullName, email, username, password} = req.body

    console.log("email", email);

    // if(fullName ===""){
    //     throw new ApiError(400, "fullname is required")
    // }

    if([fullName, email, username, password].some((field)=>
        field?.trim()=== "")
    ){
        throw new ApiError(400, "All fields are required")
    }
     const existedUser = User.findOne({
        $or:[{username}, { email }]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

     const avatarLocalPath =  req.files?.avatar[0]?.path
     const coverImageLocalPth = req.files?.coverImage[0]?.path;

     if(!avatarLocalPath){
        throw new ApiError(404,"Avtar file is required")
     }

     const avtar =  await uploadOnCloudinary(avatarLocalPath)
     const coverImage =await uploadOnCloudinary (coverImageLocalPth)

     if(!avtar){
        throw new ApiError(400, "Avtar file is required")
     }


     //db entry as a object
     const user = await User.create({
        fullName,
        avtar:avtar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
     })

     const createdUser  = await User.findById(user._id).select(
        "-password -referenceToken"
     )
     if(!createdUser){
        throw new ApiError(500, "Something went wrong registering the user ")
     }
     return res.status(201).json(
        new ApiResponse(200, createdUser, "User registed Successfully")
     )
})

export {registerUser};