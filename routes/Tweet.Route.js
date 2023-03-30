const router = require("express").Router();
const multer = require('multer');
const Tweet = require("../modules/Tweet.module")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  const upload = multer({ storage });


router.post('/posts', upload.single('image'), async (req, res) => {
  try {
  const {  username,profile,content } = req.body;
  const imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;
  const newTweet = new Tweet({ username,profile,content, imageUrl });  
  // Save the new tweet to the database
  const savedTweet = await newTweet.save();

  // Send a response with the saved tweet object
  res.status(201).json(savedTweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    
  }

});

router.get("/allPost",async(req,res)=>{
  
  try{
    const tweets = await Tweet.find()
    res.status(200).send(tweets)
  }catch(error){

  }
})


router.put('/posts/:id/like', (req, res) => {
    
  });








module.exports = router;