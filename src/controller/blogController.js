const { findOneAndUpdate } = require("../models/blogsModel")
const blogsModel = require("../models/blogsModel")

const createBlog=async function(req, res){
    try{
        let reqData=req.body
        let authorId = reqData.authorId
        let savedData = await authorModel.findById(authorId)
        if (!savedData) res.status(400).send("author id doesnot exist in author collection")
        if (!reqData) res.status(400).send({msg:"Please enter your data"})
        let checkIsPublished = req.body.isPublished
        if(checkIsPublished==='true'){
            published= new Date().toISOString();
            reqData.publishedAt= published
        }
        let Blog=await blogsModel.create(reqData)
        res.status(201).send({"data":Blog}) 
    }
    catch(err) {
        console.log("ERROR: ", err.message)
        res.status(500).send({ msg: "ERROR:", error: err.message })
    }
}

const getBlogs = async function(req, res){
    try{
        let queryData= req.query
        if (Object.keys(queryData).length !== 0) {
            let findByQuery = await blogsModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, queryData] } )
            if (findByQuery.length == 0) {
            return res.status(404).send({ status: false, msg: "No such data found" })
            }
            res.status(200).send({ status: true, data: findByQuery })
        } else {
            let findData = await blogsModel.find({ $and: [{ isDeleted: false }, { isPublished: true }] })
            if (!findData) {
                return res.status(404).send({ status: false, msg: "No such data found" })
            } else {
                res.status(200).send({ status: true, data: findData })
            }
        }
    } catch (error){
        console.log(error.message)
        res.status(500).send({ err: error.message })
    }
}

const updateBlogs = async function(req, res){
    try{
        let idOfBlog = req.params.blogId
        if(!idOfBlog) return res.status(400).send({ status: false, msg:"Blog Id is Mandatory" })
        
        let blogIdCheck = await blogsModel.find({_id:idOfBlog, isDeleted: false})
        if(!blogIdCheck) return res.status(404).send({ status: false, msh: "No such blog found" })

        let data = req.body
        if(Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Please provide data for updation of blog" })

        published= new Date().toISOString();

        // let blogData= await blogsModel.findById(idOfBlog)
        // if(data.tag){
        //     let newTag = data.tag
        //     blogData["tag"].push(newTag)
        //     data["tag"].push(blogData["tag"])
        // }
        
        let updatedBlog =await blogsModel.findByIdAndUpdate( idOfBlog ,{$and: [data, {isPublished:true}, {publishedAt: published}]}, {new:true})
        res.status(200).send({ status: true, data: updatedBlog})

    } catch (error){
        console.log(error.message)
        res.status(500).send({ err: error.message})
    }
}

const deleteByBlogId = async function(req, res){
    try{
        let idOfBlog = req.params.blogId
        if(!idOfBlog) return res.status(400).send({status: false, msg: "Blog Id is Mandatory"})

        let blogCheck = await blogsModel.findById(idOfBlog)
        if(!blogCheck) return res.status(404).send({status: false, msg: "Blog not found, please provide valid blogId"})

        deletedTime= new Date().toISOString();

        await blogsModel.findByIdAndUpdate({_id: idOfBlog},{isDeleted: true, deletedAt:deletedTime})

        res.status(200).send({ status: true, msg: "Blog Deleted Successfully"})
    } catch(error){
        console.log(error.message)
        res.status(500).send({ err: error.message})
    }
}

const deleteByQueryParams = async function(req, res){
    try{
        let queryData= req.query
        let blog = await blogsModel.find({ isDeleted: false } && queryData)
        if (blog.length == 0) {
            return res.status(404).send({ msg: "no such blog" })
        }
        deletedTime= new Date().toISOString();
        await blogsModel.updateMany(queryData, { $set: { "isDeleted": true , "deletedAt": deletedTime} })
        res.sendStatus(200)

    } catch(error){
        console.log(error.message)  
        res.status(500).send({ err: error.message})
    }
}

module.exports = { getBlogs, deleteByBlogId, deleteByQueryParams, createBlog, updateBlogs }

