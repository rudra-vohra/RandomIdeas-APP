const express =  require('express')
const router = express.Router();
const Idea = require('../model/Idea'); 

// Get Ideas
router.get('/', async (req, res) => {
  try {
    const idea = await Idea.find();
    res.json({success:true, data: idea});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, error: 'Something Went Wrong'});
  }

})

// Get Single Idea
router.get('/:id', async (req, res) =>{
try {
  const idea = Idea.findById(req.params.id);
  res.json({success: true , data: idea})

} catch (error) {
  console.log(error);
  res.status(500).json({success: true , error: "Something Went Wrong"})
}

});

// Post ideas
router.post('/', async (req,res) =>{
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  })

  try {
    const savedIdea = await idea.save();
    res.json({success: true, data: idea});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, error:'Something Went Wrong' });
  }
});

// Update Ideas
router.put('/:id', async (req, res) =>{
  try {
    const ideaToBeUpdated = await Idea.findById(req.params.id);

    // Matching the username
    if(ideaToBeUpdated.username === req.body.username){
      const updatedIdea = await Idea.findByIdAndUpdate(req.params.id,
        {
          $set:{
            text: req.body.text,
            tag: req.body.tag,                            
          },
        },
        {new: true}
      );
      res.send({success: true , data: updatedIdea})
    } else{
      res.status(403).json({success: false , error:'You are not authorized to update this idea'})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false , error:'Something Went Wrong'})
  }
});

// Delete Idea
router.delete('/:id', async (req, res) =>{
  try {
    const idea = await Idea.findById(req.params.id);

    // Matching the username
    if(req.body.username === idea.username){
      await Idea.findByIdAndDelete(req.params.id);
      res.send({success: true , data: {}});
    }else{
      // username doesn't match
    res.status(403).json({success: false , error:'You are not authorised to delete this idea'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false , error:'Something Went Wrong'});
  }
});

module.exports = router;
