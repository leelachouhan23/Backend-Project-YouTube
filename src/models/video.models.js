import mongoose, {Schema} from "mongoose";
import mongooseAggregateOaginate from "mongoose-aggregate-paginate-v2";

const videoSchema =  new Schema(
    {
        videoFile:{
            type:String, //cloudnary url
            required:true,
        },
        thumbnail:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        desctiption:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"user"
        }

    }, {timestamps:true})


    videoSchema.plugin(mongooseAggregateOaginate)
export const Video = mongoose.model("Video", videoSchema);