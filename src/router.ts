import {Router} from 'express'
import { getAppointment, postAdminAvailability, postAppointment } from './handlers/appointment'
import { getComment, postComment } from './handlers/comment'

const router = Router()

router.get("/", (request, response) => {
    response.json({message: "Get in touch"})
})

router.post("/appointment", postAppointment);
router.post("/admin", postAdminAvailability)
router.post("/comment", postComment);
router.get("/appointment", getAppointment)
router.get("/comment", getComment)

export default router;