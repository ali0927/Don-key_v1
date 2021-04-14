import multer from "multer"
import path from "path";
import {uuidv4} from "./helpers"
const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, path.resolve(__dirname, "uploads"))
      },  
    filename: function (req, file, cb) {
        const name = (req.user?.walletAddress || uuidv4()) + ".png";
        cb(null,name)
      }
})


export const upload = multer({ storage });


const storageDynamic = multer.diskStorage({
  destination:function (req, file, cb) {
      cb(null, path.resolve(__dirname, "uploads"))
    },  
  filename: function (req, file, cb) {
      const name = (uuidv4()) + ".png";
      cb(null,name)
    }
})


export const iconUpload = multer({ storage: storageDynamic });
