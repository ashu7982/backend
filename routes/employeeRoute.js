
const express = require('express')
const empRouter=express.Router()
const {userModel}=require('../models/register');
const {auth}=require('../middlewares/authmiddleware');

empRouter.post("/add",auth,async(req,res)=>{
 
    try {
        const newpost=new userModel(req.body)
      await  newpost.save()
      res.status(200).json({msg:"Post Succesfully"})
    } catch (error) {
        res.status(400).json({ error:error.message});
    }
})


empRouter.get("/",auth,async(req,res)=>{
    try {
      
        const posts = await userModel.find().limit(5)
        res.status(200).json({posts})
      } catch (error) {
        res.status(400).json({ error:error.message});
      }
})

empRouter.patch("/update/:id",auth,async(req,res)=>{
    try {
        const {id}=req.params
        const post=await userModel.findById({_id:id})
        const userID=post.userID

        if(userID===req.body.userID){
            const payload=req.body
             const data=await userModel.find({_id:id})
             await userModel.findByIdAndUpdate({_id:id},payload)
             res.status(200).json({msg:"Updated Succesfully",data})
        }
        
    } catch (error) {
        res.status(400).json({ error:error.message});
    }
})


empRouter.delete("/delete/:id",auth,async(req,res)=>{
    try {
        const {id}=req.params
        const post=await userModel.findById({_id:id})
        const userID=post.userID

        if(userID===req.body.userID){
            
             const data=await userModel.find({_id:id})
             await userModel.findByIdAndDelete({_id:id})
             res.status(200).json({msg:"Delete Succesfully",data})
            
        }else{
            console.log("hello")
        }
        
    } catch (error) {
        res.status(400).json({ error:error.message});
    }
})








module.exports ={ empRouter}