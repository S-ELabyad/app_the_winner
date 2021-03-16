const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const  Category  = require('../models/category.Model');

router.get('/' ,(req,res) => {
    res.render("Category/addCategory" , {
        viewTitle : "Insert Category"
    });
  
});

router.post('/' , (req, res) =>{
    insertRecord(req, res)

});

function insertRecord(req,res){
    var category= new Category();
    category.name = req.body.name;
    
    category.save((err,docs) =>{

        if(!err)
         res.redirect('category/list ');
        else {
            console.log('Error during record insertion :' +err);
        }
    });
}


module.exports = router;