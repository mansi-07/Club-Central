import express from 'express'
import { getSig , apply} from '../controllers/recsControllers.js'

const router = express.Router()

router.route('/getsigs').post(getSig)

router.route('/apply').post(apply)

router.route('/getapplication').post()

export default router