import * as crypto from 'crypto';
export const authGeneratePassword = async ()=>{
   return crypto.randomBytes(10).toString('hex');
}