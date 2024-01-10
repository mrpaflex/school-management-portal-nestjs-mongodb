
import { InternalServerErrorException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
const multer = require("multer");
import { diskStorage } from 'multer';
import * as path from 'path';


   export const  multerOptions: MulterOptions = {
        storage: diskStorage({
            destination: (req, file, cb) => {
              const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
              const ext = path.extname(file.originalname).toLowerCase();
              if (allowedFileTypes.includes(ext)) {
                cb(null, 'src/uploads/');
              }else{
                return cb(null, 'can be uploaded, wrong file type, although this part of the code is not necessary, because without the code will still run')
              }
              
             },
       

          filename: (req, file, cb) => {
            const splitFileName = file.originalname.split('.');
            const random = Math.round(Math.random() * 100);
            const newFileName = `${splitFileName[0]}_${random}.${splitFileName[1]}`;
            // const randowNumber = Date.now() + '-' + Math.round(Math.random() * 10);
            // const ext = path.extname(file.originalname);
            // const fileNewname = `${file.fieldname}-${randowNumber}${ext}`;
        
            cb(null, newFileName);
          },

         
        }),
    
        fileFilter: (req, file, cb) => {
         try {
          const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
          const ext = path.extname(file.originalname).toLowerCase();
    
          if (!allowedFileTypes.includes(ext)) {
            return cb(new Error('File type is not supported'), false);
          } 
          cb(null, true);

         } catch (error) {
          throw new InternalServerErrorException('server error while uploading profile')
         }
        },
      //   limits:{
      //     fileSize: 1000000,///filesize of 1mb
      // } 
      };
