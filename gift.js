import fs from 'fs';
import parse from 'csv-parser';

function shuffle(emails) {
    const shuffled = [...emails];
    for (let i = shuffled.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getResult(emails) {
    let shuffledEmails = shuffle(emails);
    for(let i = 1; i < shuffledEmails.length; i++) {
        shuffledEmails[i - 1].give = shuffledEmails[i].Email;
    }
    shuffledEmails[shuffledEmails.length - 1].give =  shuffledEmails[0].Email;
    for(let i = 0; i < shuffledEmails.length; i++) {
        console.log(`${shuffledEmails[i].Email} -> ${shuffledEmails[i].give}`)
    }
}

function giftExchange() {
    const emails = []
    fs.createReadStream('./emails.csv')
        .pipe(parse())
        .on('data', (row) => {
            emails.push(row);
        }).on('end', () => {
            getResult(emails);
        }).on('error', (err) => {
            console.log(err);
        })

}

giftExchange();