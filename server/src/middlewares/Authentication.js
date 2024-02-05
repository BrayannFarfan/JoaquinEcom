import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const AuthToken = (req, res, next) => {

    const token = req.headers['x-access-token'];

    if (!token) return res.status(403).send({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) return res.status(401).send({ message: 'Unauthorized!' });

    req.userId = decoded.id;    
    req.isAdmin = decoded.isAdmin;
   next();

    })
}


export const isAdmin = (req, res, next) => {

    if(req.userId){
        if(req.isAdmin ===  true){
            return next();
        }else{
            return res.status(403).send({ message: 'Unauthorized - Admins only!' });
        }
    }
}