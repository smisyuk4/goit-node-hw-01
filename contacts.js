const path = require('path')
const fs = require('fs').promises
const colors = require('colors');

const contactsPath  = path.join('db', 'contacts.json')

async function writeContact(path, content) {
    try{
        await fs.writeFile(path, JSON.stringify(content))   
    } catch (error) {
        console.log(error.message)
    }
}

async function listContacts() {
    try{
        let data = await fs.readFile(contactsPath)
        data = JSON.parse(data)

        console.table(data)
        return data
        
    } catch (error) {
        console.log(error.message)
    }
}

async function getContactById(contactId) {
    try {
        const data = await listContacts() 

        const contact = data.find(({id}) => id == contactId)   

        if(!contact){            
            return console.log('Sorry contact not found'.underline.red)
        }

        console.table(contact)        
        return contact

    } catch (error) {
        console.log(error.message)
    }
}

async function removeContact(contactId) {
    try {
        const data = await listContacts() 

        if (!data.some(({id}) => id == contactId)){
            return console.log('Sorry id not found'.underline.red)
        }

        let newArr = data.filter(({id}) => id != contactId)

        await writeContact(contactsPath, newArr)
     
        console.log('this is new contacts list:'.underline.green)
        console.table(newArr)
    } catch (error){
        console.log(error.message)
    }
}

async function addContact(name, email, phone) {
    if (name === '' || email === '' || phone === ''){
        return console.log('Sorry empty value'.underline.red)
    }

    const data = await listContacts() 

    const id = new Date().getTime()

    const newContact = {
        id: String(id),
        name,
        email,
        phone,
    }

    const newArr = [...data, newContact]
    console.log('this is new contacts list:'.underline.green)
    console.table(newArr)
    try {
        await writeContact(contactsPath, newArr)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact}