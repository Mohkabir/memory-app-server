import mongoose from "mongoose";
import { UsersModel } from "../model/UsersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const signUp = async(req, res) => {
  const { email, password, firstName, lastName} = req.body;

  try {

    const existingUser = await UsersModel.findOne({email});

    if(existingUser){
       return res.status(404).json({msg: "user already exist"});
    }

    const hashedpassword = await bcrypt.hash(password, 10);


    const name =`${firstName} ${lastName}`;

  
    const result = await UsersModel.create({ name, email , password: hashedpassword});

  
    const token = jwt.sign({email: result.email, id: result._id}, "mearnAuth");

    res.status(200).json({result, token});


  } catch (error) {

    res.status(500).json({msg: "something went wrong"});
    console.log(error)

  }
}

export const signIn = async(req, res) => {
  const { email, password } = req.body;

  console.log(`${email} ${password}`);

  try {

    const existingUser = await UsersModel.findOne({email});

    if(!existingUser) return res.status(404).json({msg: "user does not exist"});

    // res.status(400).send({
    //   message: "Welcome to memory app backend"
    // });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password );

    if(!isPasswordCorrect) return res.status(404).json({msg: "wrong credentials"});

    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "mearnAuth");

    res.status(200).json({result: existingUser, token});

  } catch (error) {
    res.status(500).json({msg: "something went wrong"});
  }

}