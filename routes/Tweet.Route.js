const router = require("express").Router();
const multer = require('multer');
const {Tweet} = require("../modules/Tweet.module")

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
  const {  content } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  const newTweet = new Tweet({ content, imageUrl });  
  // Save the new tweet to the database
  const savedTweet = await newTweet.save();

  // Send a response with the saved tweet object
  res.status(201).json(savedTweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    
  }

});


router.put('/posts/:id/like', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;   
    } 
      post.likes++;
  
    res.status(200).json(post);
  });








module.exports = router;