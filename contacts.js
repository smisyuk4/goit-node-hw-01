const path = require('path')
const fs = require('fs').promises

const contactsPath  = path.join('db', 'contacts.json')

async function listContacts() {
    try{
        let data = await fs.readFile(contactsPath)
        data = JSON.parse(data)

        console.log('current contact list: ')
        console.table( data)
        return data
        
    } catch (error) {
        console.log(error.message)
    }
}

async function getContactById(contactId) {
    try {
        let data = await fs.readFile(contactsPath)
        data = JSON.parse(data)

        const contact = data.find(({id}) => id == contactId)   

        if(!contact){            
            return console.log('Sorry contact not found')
        }

        console.table(contact)        
        return contact

    } catch (error) {
        console.log(error.message)
    }
}

async function removeContact(contactId) {
 try {
    let data = await fs.readFile(contactsPath)
        data = JSON.parse(data)

        if (!data.some(({id}) => id == contactId)){
            return console.log('Sorry id not found')
        }

    let newArr = data.filter(({id}) => id != contactId)
    await fs.writeFile(contactsPath, JSON.stringify(newArr))

    let checkData = await fs.readFile(contactsPath)
    data = JSON.parse(checkData)
    
    console.log('this is new contacts list:')
    console.table(data)
 } catch (error){
    console.log(error.message)
 }
}

async function addContact(name, email, phone) {
    if (name === '' || email === '' || phone === ''){
        return console.log('Sorry empty value')
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

    try {
        await fs.writeFile(contactsPath, JSON.stringify(newArr))
        await listContacts() 
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact}