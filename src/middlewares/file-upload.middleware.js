
import multer from "multer";


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/upload/");
    },
    filename: (req, file ,cb) => {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    }
});


const uploadFile = multer({storage: storageConfig});
export default uploadFile;