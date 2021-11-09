import express from 'express'
import {getUserList,changeRole} from '../controllers/superadminController.js'
const router = express.Router()

router.route('/userlist').post(getUserList)
router.route('/change').put(changeRole)

export default router