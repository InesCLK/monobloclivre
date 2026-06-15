import multer from "multer"


const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,"./public/upload/image")
    },
    filename:function(req,file,cb) {
        let ext = file.mimetype.split("/") [1]
        let sufix = Date.now() + "-" + Math.round(Math.random()* 1e9)
        cb(null,file.filename + "-" + sufix + "." + ext)
    }
})
const upload = multer({
    storage: storage,
    limit: {
        fileSize: 2 * 1024 * 1024,

    }, 
    fileFilter: (req,file,callback) => {
        if (file.mimetype.startsWith("image/")) {
            callback(null,true)
            
        } else {
            callback(new Error("seul les images sont accepter"))
        }
    }
})
export default upload