export async function generateRandomCode(leveled: string) {
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

// const randomCode = generateRandomCode('SENIOR');
// console.log(randomCode);
