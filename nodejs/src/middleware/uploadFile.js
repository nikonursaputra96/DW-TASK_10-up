const multer = require("multer")

// Preparation multer
const file = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/upload")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""))
    }
})

const upload = multer({
    storage: file
})

module.exports = upload