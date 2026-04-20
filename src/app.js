import express from "events";
import cors from "cors"
import cookieParser from "cookie-parser";
import { execArgv } from "process";


const app = express();

// app.use(cors()), this is the one type of method

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//app.use for exepting json with limit
app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded(
    {extended:true, limit:"16kb"}))//extended for object inside object


app.use(express.static("public"))

//Cookies allow the server to access and set data in the user’s browser, for basically perfoming crud operations.
app.use(cookieParser()) 

export {app}; 


//whenever you will use app.use that is useful for  middleware 
