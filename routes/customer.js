const express = require('express');
const customerList = require('../data/storage');
const functions = require('../methods/functions');

const router = express.Router();

// GET
router.get('/', (req, res) => {
    try {
        res.send(JSON.stringify(customerList));
    } catch (Exception) {
        res.send(Exception);
    }
});


//POST
router.post('/', (req, res) => {
    try {
        let listCustomer = new Object();
        listCustomer = functions.createNewCustomer(req);
        customerList.push(listCustomer);
        res.send('Customer Added');
    } catch (Exception) {
        res.send(Exception);
    }
})


//PATCH
router.patch('/', (req, res) => {
    try {
        functions.updateCustomers(customerList, req);
        res.send('Customers Updated');
    } catch (Exception) {
        res.send(Exception);
    }
})

//DELETE
router.delete('/', (req, res) => {
    try {
        const message = functions.del(customerList, req);
        res.send(message);
    } catch (Exception) {
        res.send(Exception);
    }
})

//PUT
router.put('/', (req, res) => {
    try {
        functions.appendPersonList(customerList, req);
        res.send('New persons added');
    } catch (Exception) {
        res.send(Exception);
    }
})

module.exports = router;