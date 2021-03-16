const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Cat = require("../models/category.Model");
const axios = require('axios');

router.get('/', async(req,res)=>{
    Cat.find({}, (err,result) =>{
        if (err){
            res.send(err)
            
        }
    })
            res.render("Category/formQuestion" , {
            viewTitle : "Insert Category" 
                        }); 
    });

module.exports = router;