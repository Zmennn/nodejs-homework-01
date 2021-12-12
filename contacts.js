const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
var colors = require('colors');

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
    return users.find((el) => el.id === contactId) ? users.find((el) => el.id === contactId) : "user not found".red
};

const removeContact = async (contactId) => {
    const users = await readData();

    if (users.some((el) => el.id === contactId)) {
        const newData = users.filter((el) => el.id !== contactId);
        await writeData(newData);
        return "user remove successfully".blue
    } else {
        return "no such user found".red;
    }
};

const addContact = async (user) => {

    for (let key in user) {
        if (!user[key]) {

            return "incomplete user data, operation failed".red
        }
    };

    user.id = crypto.randomUUID()
    const data = await readData();
    data.push(user);
    await writeData(data);
    return `user ${user.name} is registered successfully`.blue
};

module.exports = { listContacts, getContactById, removeContact, addContact, readData };
