const jwt=require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const UserLoggedIn=(req,res,next)=>{
    const token=req.header('authToken');
    if(!token){
        let msg="Please Login First";
        res.json({msg});
        return res.status(401).send({error: "Please try with a valid token"});
    }
    try {
        const data=jwt.verify(token, jwtSecret);
        req.user=data.User;
        next();
    } catch (error) {
        let msg="Please Login First";
        res.json({msg});
        return res.status(401).send({error: "Please try with a valid token"});
    }
}

module.exports=UserLoggedIn;