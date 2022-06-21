const mongoose=require('mongoose')
const objectID=mongoose.Schema.Types.ObjectId

const blogSchema=new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  body:{
    type:String,
    required:true
  },
  authorId:{
    type:objectID,
    ref:'Author'
  },
  tag:[String],
  category: {
    type:String,
    required:true,
  },
  subCategory:[String],
  deletedAt:{
    type:String,
    default:null
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
  publishedAt:{
    type:String,
    default:null
  },
  isPublished:{
    type:Boolean,
    default:false
  }
  }, {timestamp:true})
module.exports=mongoose.model('Blog', blogSchema)