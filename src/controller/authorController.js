const authorModel=require('../models/authorModel')

const authors=async function(req, res){
    try{
    let data=req.body
    if(!data) 
        return res.status(400).send({msg:"Please enter the required data"})
    let author=await authorModel.create(data)
    res.send({msg:author})
}catch(error){
    console.log(error.message)
    res.status(200).send({err:error.message})
}
}




module.exports.authors=authors;