import express from "express";
import { getPost, createPost, updatePost, deletePost, likePost } from "../controllers/Post.js";
import auth from "../middleware/auth.js";


 const router = express.Router();

 router.get("/", getPost );
 router.post("/", createPost);
 router.patch("/:id", updatePost);
 router.delete("/:id", deletePost);
 router.patch("/:id/like", likePost);


export default router;
