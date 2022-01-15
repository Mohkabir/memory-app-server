import mongoose from "mongoose"
import { PostMessage } from "../model/postMessage.js"


export const getPost = async(req, res) => {

  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(400).json({message: error.message });
  }

}


export const createPost = async(req, res) => {
  
  const post = req.body;
  // const newPost = new PostMessage(post);
  const newPost = new PostMessage({...post, createdAt : new Date().toISOString()});
  try {
     await newPost.save();
    res.status(201).json(newPost)
    
  } catch (error) {
    res.status(400).json({message: error.message });
  }

}

export const updatePost = async(req, res) => {
  const post = req.body ;
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send("no post with this id does not exist")
  }

  const updatedPost = await PostMessage.findByIdAndUpdate( id, post, {new: true});
  res.json(updatedPost);

}

export const deletePost = async(req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send("no post with this id does not exist")
  }
  await PostMessage.findByIdAndRemove( id );
  res.json({message: "deleted"});
}

export const likePost = async(req, res) => {
  const { id } = req.params;
   
  // if(!req.userId){
  //   return res.json({msg: "unauthenticated"});
  // }

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send("no post with this id does not exist")
  }

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === post._id);
  console.log(index, "index log")
  if(index === -1){

    post.likes.push(post._id);

    // console.log("liking log", post.likes);
  }else{
    post.likes = post.likes.filter((id) => id !== post._id);

    console.log("dislike log");
  }
  const likedid = await PostMessage.findByIdAndUpdate( id, post, {new: true});
  res.json(likedid);
}
