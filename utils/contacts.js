const fs = require('fs')
const path = './temp'

if(!fs.existsSync(path)){
    fs.mkdirSync(path)
}

if(!fs.existsSync('./temp/contacts.json')){
    fs.writeFileSync('./temp/contacts.json','[]','utf-8')
}

const bacaKontak = () => {
    const file = fs.readFileSync('temp/contacts.json','utf8');
    const contacts = JSON.parse(file);
    return contacts
}

const simpanContact = (nama, email, noHape) => {
    const contact = {nama, email, noHape};
    const contacts = bacaKontak();
    // const file = fs.readFileSync('temp/contacts.json','utf8');
    // const contacts = JSON.parse(file);

    const duplikat = contacts.find((contact) => contact.nama === nama)
    if(duplikat){
        console.log(chalk.red.inverse.bold('Kontak sudah terdaftar'))
        return false
    }
}

module.exports = {bacaKontak}