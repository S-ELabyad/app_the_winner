const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const  form  = require('../models/formadd');
const Cat = require("../models/category.Model");
const axios = require('axios');


router.get('/', async(req,res)=>{
    Cat.find({}, (err,result) =>{
        if (err){
            res.send(err)
            
        }
            
            // res.send("" , {
            // viewTitle : "Insert Category" , data: result
            //             }); 

            res.send(result)
    });
});
  

module.exports = router;