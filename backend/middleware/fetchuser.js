import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const JWT_SERECT = "Ujt!gf87$JH@Nm4l12#FdSpfafa3455@@!4##@"

const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try{
        const decoded = jwt.verify(token,JWT_SERECT);
        req.user = decoded.user;
        next();
        }catch(error){
            res.status(400).send({error:error});
            }
}

export default fetchuser;