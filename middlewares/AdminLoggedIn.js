const jwt=require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const AdminLoggedIn=(req,res,next)=>{
    const token=req.get("adminToken");
    if(!token){
        return res.status(401).send({error: "Please try with valid token"});
    }
    try {
        const data=jwt.verify(token,jwtSecret);
        req.admin=data.Admin;
        next();
    } catch (error) {
        return res.status(401).send({error: "Please try with valid token"});
    }
}

module.exports=AdminLoggedIn;