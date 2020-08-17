const { modelCustomer, modelPerson } = require('../data/customerModel');

const createPersonList = (req) => {
    if (!req.body.persons) return [];

    const personList = req.body.persons;
    const newPersonList = [];
    for(i = 0; i < personList.length; i++) {
        const listPerson = new modelPerson(personList[i],i)
        newPersonList.push(listPerson);
    }

    return newPersonList;
}

const createNewCustomer = (req) => {
    const newCustomer = new modelCustomer(req);
    newCustomer.persons = createPersonList(req);
    
    return newCustomer;
}

const getCustomerIndex = (customerId, customerList) => {
    try {
        const index = customerList.map(customer => { return customer.id; }).indexOf(customerId);
        if(index == -1) throw `No customers with id: ${customerId}`;

        return index;
    } catch (Exception) {
        throw Exception;
    }
}

const getPersonIndex = (personId, personList) => {
    try {
        const index = personList.map(person => { return person.id }).indexOf(personId);
        if(index == -1)  throw `No person with id: ${personId}`;

        return index;
    } catch (Exception) {
        throw Exception;
    }
}

const del = (customerList, req) => {
    const customerId = parseInt(req.query.customer_id);
    const customerIndex = getCustomerIndex(customerId, customerList);
    if(req.query.person_id_list) {        
        const personList = customerList[customerIndex].persons;
        const personIdList = req.query.person_id_list;
    
        if(personIdList > personList.length) {
            throw ('Person ID list cant be longer than persons list');
        }

        personIdList.forEach(id => {
            const personIndex = getPersonIndex(parseInt(id), personList);
            customerList[customerIndex].persons[personIndex].is_deleted = "true"; 
        });
            
        return "Persons marked as deleted";
    }
    customerList.splice(customerIndex, 1);

    return "Customer deleted";
}

const updateCustomers = (customerList, req) => {
    const updater = req.body;

    if (updater.length > customerList.length){
        throw "Update list can't be longer than customer list";
    }

    updater.forEach(updatedCustomer => {
        const customerIndex = getCustomerIndex(updatedCustomer.id, customerList); 
        if (updatedCustomer.name) customerList[customerIndex].name = updatedCustomer.name;
        if (updatedCustomer.is_active) customerList[customerIndex].is_active = updatedCustomer.is_active;
        const updatedPersonList = updatedCustomer.persons;

        updatedPersonList.forEach(updatedPerson => {
            const personIndex = getPersonIndex(updatedPerson.id, updatedPersonList);  
            if (updatedPerson.first_name) customerList[customerIndex].persons[personIndex].first_name = updatedPerson.first_name;
            if (updatedPerson.last_name) customerList[customerIndex].persons[personIndex].last_name = updatedPerson.last_name;
            if (updatedPerson.role) customerList[customerIndex].persons[personIndex].role = updatedPerson.role;
            if (updatedPerson.is_deleted) customerList[customerIndex].persons[personIndex].is_deleted = updatedPerson.is_deleted;
        });
    });
}

const appendPersonList = (customerList, req) => {
    const appender = req.body;

    if(!appender.persons) throw('No persons to append');

    const customerIndex = getCustomerIndex(parseInt(appender.id), customerList);
    const originalList = customerList[customerIndex].persons;
    const updateList = appender.persons;
    const checkedList = [];

    updateList.forEach(person => {
        const newPerson = new modelPerson(person, 0);
        checkedList.push(newPerson);
    });

    const newList = originalList.concat(checkedList);
    newList.forEach((person, index) => {
        person.id = index;
    });

    customerList[customerIndex].persons = newList;
}

module.exports = { createNewCustomer, del, updateCustomers, appendPersonList };