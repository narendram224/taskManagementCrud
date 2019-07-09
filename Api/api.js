const express = require('express')
const app = express()
const port  = process.env.port | 3000;
const bodyParser = require('body-parser')
const {mongoose}  = require('./db/mongoose');
// load the mongoose model
const {List,Task}  = require('./db/models');
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors());
// Routes handle
/*
lsit of routes
*/

app.get('/',(req,res)=>{
    res.send("server is running ");
})
/*
    REquest:get 
    aim:fetch all the taks list
*/ 

app.get('/list',(req,res)=>{
    // this api is use for getting list of task in array from dataabse

        
    List.find({}).then((lists)=>{
            res.send(lists);
    })
})

/**
 * request:post
 * aim:send the new task
 */
app.post('/list',(req,res)=>{
    // create a new list and return a new list document back to the user(which including the id )
    // the list information pass via the json request body

    let title  = req.body.title;

        let newList = new List({title});

        newList.save().then((listdoc)=>{
            // the full lsit doc will returns
            res.send(listdoc);
        })
})

app.patch('/list/:id',(req,res)=>{
    // update the specific list 

    List.findOneAndUpdate({_id:req.params.id},{
        $set:req.body
    }).then(()=>{
        res.send().status(200);
    }).catch((err)=>{
        res.status(401).send("data is not updated",err);
    })
})


app.patch('/list/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndUpdate({
        _id:req.params.taskId,
        _listId:req.params.listId
    },{
        $set:req.body
    }).then(()=>{
        res.send({message:"updated succesfully"});
    })
})
app.delete('/list/:id',(req,res)=>{
    // using for delting the data specific listr with having the id

    List.findOneAndDelete({_id:req.params.id}).then(()=>{
        res.status(200).send("data is delted successfully")
    }).catch((err)=>{
        res.status(401).send("data is not delte",err);
    })
})


app.get('/list/:listId/tasks',(req,res)=>{
    // we want to return all task
    Task.find({
        _listId:req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    })
})

app.post('/list/:listId/tasks',(req,res)=>{
    let newTask = new Task({
        title:req.body.title,
        _listId:req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
})
app.listen(port,()=>{
    console.log("server is runiing port ",port);
})