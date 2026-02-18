import Task from "../models/Task.js";

export const getTasks = async(req,res)=>{
 const tasks = await Task.find({user:req.user.id});
 res.json(tasks);
};

export const createTask = async(req,res)=>{
 const task = await Task.create({
   title:req.body.title,
   user:req.user.id
 });
 res.json(task);
};

export const updateTask = async(req,res)=>{
 const task = await Task.findByIdAndUpdate(
   req.params.id,
   { title:req.body.title },
   { returnDocument: "after" }
 );
 res.json(task);
};


export const deleteTask = async(req,res)=>{
 await Task.findByIdAndDelete(req.params.id);
 res.sendStatus(200);
};