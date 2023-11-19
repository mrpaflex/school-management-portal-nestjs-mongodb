import * as bcrypt from 'bcrypt';

export async function hashed(password: string){
    const saltOrRounds = 10;
   return await bcrypt.hash(password, saltOrRounds);
}

export const comparedPassword = async (password: string, hashed: string): Promise<boolean>=>{
    return await bcrypt.compare(password, hashed);
}