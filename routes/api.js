const express = require('express');
const router =  express.Router();
const Mna = require('../model/mnapi');
const Pridiction = require('../model/pridiction');
//  get data
router.get('/mnapi',function(req , res, next){
    Mna.find({}).then(function(mna){
        res.send(mna); 
    })

    Mna.geoNear(
    {type:"Point",coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
    {maxDistance : 100000,spherical: true}
    ).then(function(mna){
      res.send(mna);
    })
});
// update data
router.post('/mnapi',function(req,res, next){
   //var mna = new Mna(req.body);
   //mna.save();
  
   Mna.create(req.body).then(function(mnapi){
      res.send(mnapi);
   }).catch(next);
   
});
// update data
router.put('/mnapi/:id',function(req,res, next){
   console.log(req.body)
    Mna.findByIdAndUpdate({_id : req.params.id},req.body).then(function(){
      Mna.findOne({_id : req.params.id}).then(function(mna){
         res.send(mna);
      }).catch(next);
     }).catch(next);
});

// delete data
router.delete('/mnapi/:id',function(req,res, next){
     Mna.findByIdAndRemove({_id : req.params.id}).then(function(mna){
      res.send(mna);
     });
});

router.post('/pridiction',function(req,res, next){
   Pridiction.create(req.body).then(function(prid){
      res.send(prid);
   }).catch(next);
   
});
router.get('/pridiction/:ticker/:sdate/:edate',function(req,res, next){
   Pridiction.find({
      $and : [
      {ticker :{$in : req.params.ticker.split(',')}},
      {prediction_date : { $gte : req.params.sdate , $lte : req.params.edate}}]}
      ).then(function(prid){
      res.send(prid);
   }).catch(next);
   
});
module.exports  = router;