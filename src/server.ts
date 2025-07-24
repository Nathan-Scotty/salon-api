import express from "express"
import cors from "cors"
import morgan from "morgan"
import multer from "multer"
import router from "./router"
import { protect } from "./modules/auth"
import path from "path"
import fs from 'fs'
import { createNewUser, signin } from "./handlers/user"

const app = express()

const uploadsDir = path.join(__dirname, "uploads");
if(!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir), {recursive: true}
}
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, uploadsDir)
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

export const upload = multer({ storage: storage }).single("image");

app.use(cors());
app.use(morgan('dev'));
app.use (express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api", upload, protect, router)
app.post("/signup", createNewUser)
app.post("/signin", signin)
 
export default app;