const path = require('path')
const fs = require('fs').promises

const contactsPath  = path.join('db', 'contacts.json')

function listContacts() {
    fs.readFile(contactsPath)
        .then(data => console.log(data.toString()))
        .catch(err => console.log(err.message));
}

function getContactById(contactId) {
    fs.readFile(contactsPath)
        .then(data => {
            const arr = JSON.parse(data)

            if(contactId > arr.length){
                console.log("id not correct")
                return
            }            

            const contact = arr.find(item => item.id == contactId)   
            console.log(contact)
        })                        
        .catch(err => console.log(err.message));
}

function removeContact(contactId) {
// ...твій код
}

function addContact(name, email, phone) {
// ...твій код
}

module.exports = { listContacts, getContactById, removeContact, addContact}