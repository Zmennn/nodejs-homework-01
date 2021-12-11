const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readData = async () => {
    const data = await fs.readFile(contactsPath, 'utf8');
    const res = JSON.parse(data);
    return res;
};

const writeData = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
};

const listContacts = async () => {
    return readData()
};

const getContactById = async (contactId) => {
    const users = await readData();
    return users.find((el) => el.id === contactId)
};

const removeContact = async (contactId) => {
    const users = await readData();
    const newData = users.filter((el) => el.id !== contactId);
    writeData(newData);
    return "user remove successfully"
};

const addContact = async (user) => {
    user.id = crypto.randomUUID()
    const data = await readData();
    data.push(user);
    writeData(data);
    return `user ${user.name} is registered successfully`
};

module.exports = { listContacts, getContactById, removeContact, addContact, readData };
