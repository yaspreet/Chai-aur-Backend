import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vidoeShcema = new Schema(
    {
      videoFile:{
           type: String,
           required:true
      },
      thumbnail:{
        type: String,
        required:true
   }, 
    tittle:{
    type: String,
    required:true
},
description:{
    type: String,
    required:true
},
duration:{
    type:Number,
    requird:true
},
views:{
    type:Number,
     default:0
},
isPUblished:{
    type:Boolean,
    default:true
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
    },
    {
        timestamps:true
    }
)
vidoeShcema.plugin(mongooseAggregatePaginate)
export const video = mongoose.model("Video",vidoeShcema)