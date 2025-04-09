import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema =  new Schema({
    videofile : {
        type : String,  //cloudinary url
        required : true
    },
    thumbnail : {       
        type : String,  //cloudinary url
        required : true
    },
    owner : {
      type : Schema.Types.ObjectId,
      ref : 'User'
    },
    title : {
        type : String,
        required : true
    },
    decription : {
        type : String,
        required : true,
    },
    duration : {
        type : Number,  //cloudinary url
        required : true,
    },
    views : {
        type : Number,
        default : 0,
    },
    isPublished : {
        type : Boolean,
        default : true
    }
},{timestamps : true});

videoSchema.plugin(mongooseAggregatePaginate);

export const Video =  mongoose.model('Video',videoSchema);