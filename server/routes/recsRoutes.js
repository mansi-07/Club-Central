import express from 'express'
import { getSig , apply, getStatus} from '../controllers/recsControllers.js'

const router = express.Router()

router.route('/getsigs').post(getSig)

router.route('/apply').post(apply)

router.route('/getstatus').post(getStatus)

export default router