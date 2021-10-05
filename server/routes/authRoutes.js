import express from 'express'
import {signInUser, signUpUser , getInstitute} from '../controllers/authControllers.js'

const router = express.Router()

router.route('/signup').post(signUpUser)
router.route('/signin').post(signInUser)
router.route('/institute').get(getInstitute)

export default router