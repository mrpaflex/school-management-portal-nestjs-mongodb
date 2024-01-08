//this function will hold the generated matric number
export async function generateRandomCode(leveled: string) {
    //function that will hold the random generated number
    function getRandomNumber() {
        return Math.floor(Math.random() * 1000).toString().padStart(4, '0');
    }

    if (leveled === 'JUNIOR') {
        const randomCode = `23/TFS/JN/${getRandomNumber()}`;
        return randomCode;
    } else {
        const randomCode = `23/TFS/SN/${getRandomNumber()}`;
        return randomCode;
    }
}
