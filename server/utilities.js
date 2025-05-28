import jsw from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()
export function authenticateToken(req,res,next){
    const token = req.headers.authorization.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            message : "Error in fetching"
        })
    }

    const chktoken = jsw.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,user)=>{
        if(error){
            return res.status(401).json({
                message : "Error in fetching"
            })
        }
        req.user = user;
        next()
    })
}
