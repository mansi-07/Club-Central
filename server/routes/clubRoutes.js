import express from 'express'
import { addEvent, getEvent } from '../controllers/eventControllers.js'
import { getClubData, postClubData } from '../controllers/clubControllers.js'

const router = express.Router()

router.route('/addevent').post(addEvent)
router.route('/getevents').post(getEvent)

router.route('/clubdata').post(getClubData)
router.route('/editclubdata').post(postClubData)

export default router