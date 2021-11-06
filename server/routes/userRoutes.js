import express from 'express'
import {getUserData, postUserData} from '../controllers/userController.js'

const router = express.Router()

router.route('/userdata/:id')
            .get(getUserData)
            .post(postUserData)

export default router