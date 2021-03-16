const express = require ('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const  Sport  = require('../models/questionModel');


router.get('/' , (req,res) => {
    Sport.find((err, docs) => {
            if (!err)   res.send(docs);
            else  console.log("error to get data " +err);
    
        });    
    // res.render("Category/addOrEdit" , {
    //     viewTitle : "Insert Category"
    // });
});

router.post('/' , (req,res) => {
    const newRecord = new Sport (
       req.body
    );

    newRecord.save((err , docs) => {
        if(!err) res.send(docs);
        else console.log("error creating new data :" +err);
    });

});

// router.post('/' , (req, res) =>{
//     insertRecord(req, res)

// });

// function insertRecord(req,res){
//     var sport= new Sport();
   
//     sport.question = req.body.question;
//     sport.reponse = req.body.reponse;

//     sport.save((err,docs) =>{

//         if(!err)
//          res.redirect('sport/list ');
//         else {
//             console.log('Error during record insertion :' +err);
//         }
//     });
// }

router.put("/:id" , (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow :" +req.params.id);
    
    const updateRecord = {
        question : req.body.question,
        reponse : req.body.reponse
    };

    Sport.findByIdAndUpdate(
        req.params.id,
        { $set : updateRecord },
        { new: true},
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Update Error :" +err); 
        }

    )
});

router.delete('/:id' , (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow :" +req.params.id);
    
    Sport.findByIdAndRemove(
        req.params.id,
        (err , docs) => {
            if(!err) res.send(docs) ;
            else console.log("Delte Error :" +err) ;
        }
)

});

module.exports = router;
