const postController = require("../controllers/postController");
const router = require("express").Router();

// Create post
router.post("/", postController.createPost);
// Update post
router.put("/:id", postController.updatePost);
// Delete post
router.delete("/:id", postController.deletePost);
// Get all posts
router.get("/allPosts", postController.getAllPosts);
// React post
router.put("/:id/like", postController.reactPost);

module.exports = router;