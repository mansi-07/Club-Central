import jwt from 'jsonwebtoken'
import GlobalUser from '../models/globalUserModel.js'
import asyncHandler from 'express-async-handler'

export const protect = asyncHandler(async(req, res, next) =>{
    var token
    
    if( req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){

            try {
                token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                
                req.user = await GlobalUser.findById(decoded.id).select('-password')

                next()

            } catch (error) {
                res.status(401)
                throw new Error('Authorization failed due to bad token')
            }
    }

    if(!token){
        res.status(401)
        throw new Error('Authorization failed.No token found')
    }

})


