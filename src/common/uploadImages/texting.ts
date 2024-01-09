// const multer = require("multer");
// import * as path from 'path';

// export const multerOptions = multer({
//     // storage: multer.diskStorage({}),

//      filename: (req, file, cb) => {
//        // const splitFileName = file.originalname.split('.');
//        // const random = Math.round(Math.random() * 100);
//        // const newFileName = `${splitFileName[0]}_${random}.${splitFileName[1]}`;
//        const randowNumber = Date.now() + '-' + Math.round(Math.random() * 10);
//        const ext = path.extname(file.originalname);
//        const fileNewname = `${file.fieldname}-${randowNumber}${ext}`;
//        console.log(fileNewname)
//        cb(null, fileNewname);
//      },

//    fileFilter: (req, file, cb) => {
//      const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
//      const ext = path.extname(file.originalname).toLowerCase();

//      if (allowedFileTypes.includes(ext)) {
//        cb(null, true);
//      } else {
//        cb(new Error('File type is not supported'), false);
//      }
//    },
//  //   limits:{
//  //     fileSize: 1000000,///filesize of 1mb
//  // } 
//  });
  