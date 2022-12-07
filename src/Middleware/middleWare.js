const jwt = require("jsonwebtoken");

const authentication = function(req, res, next){
    
    try{
        let token = req.headers["x-Api-Key"];
        if (!token) token = req.headers["x-api-key"];

        if (!token) return res.status(401).send({ status: false, msg: "token must be present" });

        jwt.verify(token, "Hera-pheri", (err, author) => {

            if (err)
              return res.status(401).json({ status: false, message: "Token is not valid!" });
      
              req.headers["authorId"] = author.authorId
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ err : error.message });
    }
}

module.exports={authentication}