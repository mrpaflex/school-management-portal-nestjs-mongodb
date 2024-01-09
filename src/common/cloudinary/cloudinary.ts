import {v2 as cloudinary} from 'cloudinary';
//import {Cloudinary} from "@cloudinary/url-gen";
import * as dotenv from 'dotenv';

dotenv.config()

// export const cloudinary = new Cloudinary({cloud: {
//     cloudName: process.env.CLOUD_NAME,
//     apiKey: process.env.API_KEY,
//     apiSecret: process.env.CLOUDINARY_SECRET
// }});

          
 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
  
export { cloudinary };

