import { HttpException, HttpStatus } from "@nestjs/common";
import { Class, MyLeveled } from "src/student/enum/classes.enum";

//this function will hold the generated matric number
export async function generateRandomCode(leveled: MyLeveled, current_Class: Class) {
    
    //function that will hold the random generated number
    function getRandomNumber() {
        return Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    }

    if (leveled === "JUNIOR SECONDARY" && (current_Class === "JSS1" || current_Class === "JSS2" || current_Class === "JSS3")) {
        const randomCode = `23/TFS/JN/${getRandomNumber()}`;
        return randomCode;
    }else if(leveled === "SENIOR SECONDARY" && (current_Class === "SS1" || current_Class === "SS2" || current_Class === "SS3")) {
        const randomCode = `23/TFS/SN/${getRandomNumber()}`;
        return randomCode;
    }
    else{
        throw new HttpException('please section your level and current class', HttpStatus.NOT_FOUND)
    }
}
