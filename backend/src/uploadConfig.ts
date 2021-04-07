import multer from "multer"
import path from "path";
import {uuidv4} from "./helpers"
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "uploads") ,
    filename: function (req, file, cb) {
        cb(null, req.user?.walletAddress || uuidv4() + ".png")
      }
})


export const upload = multer({ storage });
