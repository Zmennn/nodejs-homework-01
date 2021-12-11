const { Command } = require('commander');
var colors = require('colors');

const { listContacts, getContactById, removeContact, addContact } = require('./contacts');


const program = new Command();

program
    .requiredOption('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const contacts = await listContacts();
            console.table(contacts);
            break;

        case 'get':
            const contact = await getContactById(id);
            console.log(contact);
            break;

        case 'add':
            const text = await addContact({ name, email, phone });
            console.log(text.blue);
            break;

        case 'remove':
            const info = await removeContact(id);
            console.log(info.blue);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
