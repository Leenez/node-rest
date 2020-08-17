const uuid = require('uuid');

let customerIdCounter = 0;
const getCustomerId = () => {
    customerIdCounter++;
    
    return customerIdCounter;
}

class modelCustomer  {
    constructor(req) {
        const data = req.body;
        this.id = getCustomerId();
        this.uuid = uuid.v4();
        (data.name) ? this.name = data.name: this.name = '';
        (data.is_active) ? this.is_active = data.is_active: this.is_active = true;
        (data.persons) ? this.persons = data.persons: this.persons = [];
    }
}

class modelPerson {
    constructor(data, index) {
        this.id = index;
        this.uuid = uuid.v4();
        (data.first_name) ? this.first_name = data.first_name: this.first_name = '';
        (data.last_name) ? this.last_name = data.last_name: this.last_name = '';
        (data.role) ? this.role = data.role: this.role = '';
        (data.is_deleted) ? this.is_deleted = data.is_deleted: this.is_deleted = '';
    }
}

module.exports = {modelCustomer, modelPerson}