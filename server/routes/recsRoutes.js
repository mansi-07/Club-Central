import express from 'express'
import { getSig , apply} from '../controllers/recsControllers.js'

const router = express.Router()

router.route('/getsigs').post(getSig)

router.route('/apply').post(apply)

export default router