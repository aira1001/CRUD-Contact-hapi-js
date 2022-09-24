const { createContact, getAllContact, getContactById, updateContact, deleteContact } = require('./handler');
 
const routes = [
    {
        method: 'POST',
        path: '/contact',
        handler: createContact,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    },
    {
        method: 'GET',
        path: '/contact',
        handler: getAllContact,
    },
    {
        method : 'GET',
        path : '/contact/{id}',
        handler : getContactById,
    },
    {
        method : 'PUT',
        path : '/contact/{id}',
        handler : updateContact,
    },
    {
        method: 'DELETE',
        path: '/contact/{id}',
        handler: deleteContact,
    },
];
 
module.exports = routes;