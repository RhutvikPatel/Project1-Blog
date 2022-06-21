const blogsModel = require('../models/blogsModel');
const authorModel = require('../models/authorModel')

const createBlog=async function(req, res){
try {
let reqData=req.body
if(!data)
return res.status(400).send({status:false, msg:"Data is necessary"})
let authorCheck=await authorModel.findById(reqData.authorId)
if(!authorCheck)
return res.status(404).send({status:false, msg:"Author not found, please provide valid authorID"})
let createBlog=await blogsModel.create(data)
res.status(201).send({status:true, data:createBlog})
} catch(error){
    console.log(error.message)
    res.status(400).send({status:false, err:error.message})
}}


module.exports.createBlog=createBlog;