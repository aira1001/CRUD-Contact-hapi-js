const { nanoid } = require('nanoid');
const contact = require('./contact');
 
const createContact = (request, h) => {
    const { firstName, lastName, numberPhone, address } = request.payload;
 
    const id = nanoid(16);
    
 
    const newContact = {
        id, firstName, lastName, numberPhone , address
    };
 
    contact.push(newContact);
 
    const isSuccess = contact.filter((n) => n.id === id).length > 0;
 
    if (isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Contact berhasil ditambahkan',
            data: {
                contactId: id,
            },
        });
        response.code(201);
        return response;
    }
 
    const response = h.response({
        status: 'fail',
        message: 'Contact gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllContact = () => ({
    status: 'success',
    data: {
      contact,
    },
});

const getContactById = (request, h) => {
    const { id } = request.params;

    const contactById = contact.filter((n) => n.id === id)[0];

    if(contactById !== undefined){
        return{
            status : 'success',
            data : {
                contactById,
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Contact tidak ditemukan',
      });
      response.code(404);
      return response;
}

const updateContact = (request, h) => {
    const { id } = request.params;

    const { firstName, lastName, numberPhone, address } = request.payload;
    

    const index = contact.findIndex((n) => n.id === id);

    if(index !== -1){
        contact[index] = {
            ...contact[index],
            firstName,
            lastName,
            numberPhone,
            address,
          };
        
        const response = h.response({
            status: 'success',
            message: 'Contact berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
}

const deleteContact = (request, h) => {
    const { id } = request.params;
   
    const index = contact.findIndex((n) => n.id === id);
   
    if (index !== -1) {
      contact.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Contact berhasil dihapus',
      });
      response.code(200);
      return response;
    }
}
 
module.exports = {createContact, getAllContact, getContactById, updateContact, deleteContact};