const { model } = require("mongoose");
const multer = require("multer");


// file upload
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './images')
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})


// code for filtering file - jpg
const filter = function(req,file,cb){
    if(file.mimetype == 'image/jpeg' || file.mimetype== 'image/png'){
        // correct format
        cb(null, true)
    }
    else{
        // incorrect format
    }
}

const upload = multer({
    storage : storage,
    fileFilter : filter
})
module.exports = upload;
