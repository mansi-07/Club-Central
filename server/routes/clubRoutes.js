import express from 'express'
import { addEvent, getEvent } from '../controllers/eventControllers.js'

const router = express.Router()

router.route('/addevent').post(addEvent)
router.route('/getevents').post(getEvent)

export default router