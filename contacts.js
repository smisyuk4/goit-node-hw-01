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
            const contact = data.map(item => item.id === contactId)            
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