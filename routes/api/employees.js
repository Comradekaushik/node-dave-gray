const express = require("express");
const router = express.Router();
const path = require("path");

const data = {};

// data.employees = require('../../data/employees.json');

const employeesController = require('../../controllers/employeesController.js');
const verifyJWT = require('../../middleware/verifyJWT.js');

router.route('/')
    // .get((req,res)=>{
    //     res.json(data.employees);
    // })

    //instead

    .get(verifyJWT, employeesController.getAllEmployees)

    // .post((req,res)=>{
    //     res.json({
    //         "firstname": req.body.firstname,
    //         "lastname": req.body.lastname

    //     })
    // })


    //instead

    .post(employeesController.createNewEmployee)
    // .put((req,res)=>{
    //     res.json({
    //         "firstname": req.body.firstname,
    //         "lastname": req.body.lastname

    //     });
    // })

    //instead
    .put(employeesController.updateEmployee)
    // .delete((req,res)=>{
    //     res.json({"id" : req.body.id})

    // });
    //instead

    .delete(employeesController.deleteEmployee)


    // router.route('/:id').get((req,res)=>{
    //     res.json({"id" : req.params.id});
    // });

    //instead

    router.route('./:id').get(employeesController.getEmployee)


    module.exports = router;