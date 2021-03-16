const express = require ('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const Music  = require('../models/test');


router.get('/' , (req,res) => {
    Music.find((err, docs) => {
            if (!err)   res.send(docs);
            else  console.log("error to get data " +err);
    
        });  
    // res.render("Category/addOrEdit" , {
    //     viewTitle : "Insert Category"
    // });  
});

router.post('/' , (req,res) => {
    const music = new Music (
        req.body
    );

    music.save((err , docs) => {
        if(!err) res.send(docs);
        else console.log("error creating new music :" +err);
    });

});
// router.post('/' , (req, res) =>{
//     insertRecord(req, res)

// });

// function insertRecord(req,res){
//     var music= new Music();
   
//     music.question = req.body.question;
//     music.reponse = req.body.reponse;

//     music.save((err,docs) =>{

//         if(!err)
//          res.redirect('music/list ');
//         else {
//             console.log('Error during record insertion :' +err);
//         }
//     });
// };
router.put("/:id" , (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow :" +req.params.id);
    
    const updateRecord = {
        question : req.body.question,
        reponse : req.body.reponse
    };

    Music.findByIdAndUpdate(
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
    
    Music.findByIdAndRemove(
        req.params.id,
        (err , docs) => {
            if(!err) res.send(docs) ;
            else console.log("Delte Error :" +err) ;
        }
)

});

module.exports = router;