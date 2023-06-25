const router = require('express').Router();
const Movie = require('../Models/Movie');


//Add Movies


router.post('/api/addMovie', async (req, res) => {
    try {
      const newRecipe = new Movie({
        mname: req.body.mname,
        actor: req.body.actor,
        actress: req.body.actress,
        director: req.body.director,
        releasedYear: req.body.releasedYear, 
        camera: req.body.camera,
        producer: req.body.producer,
        language: req.body.language,
      });
  
      const savedRecipe = await newRecipe.save();
      res.status(200).json('Recipe added successfully');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

//display

  router.get('/api/movieList', async (req, res) => {
    try {
      const Movielist = await Movie.find({});
      res.status(200).json(Movielist);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // Delete

  router.delete('/api/delete/:id',async(req,res)=>{
    try{
  
        //find the item by its id and deleted it
  
        const deleteItem= await Movie.findOneAndDelete(req.params.id);
        res.status(200).json('item deleted');
  
    }catch(err)
    {
        res.json(err);
    }
  })


  //Update

  router.put('/api/updateitem/:id',async(req,res)=>{
    try{
        //find the item by its id and update it
        const updateItem =await Movie.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json('item Updated');
  
    }catch(err){
        res.json(err);
    }
  
  })
  
  

module.exports = router;
