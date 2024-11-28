var express = require('express');
var router = express.Router();
let Task = require('../model/task.js');
let taskController = require('../controllers/task.js')
/* Get route for the task list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the task list */
function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next;
}

router.get('/',async(req,res,next)=>{
try{
    const todoList = await Task.find();
    res.render('Task/list',{
        title:'To-Do List',
        displayName: req.user ? req.user.displayName:'',
        todoList:todoList
    })}
    catch(err){
        console.error(err);
        res.render('Task/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Task/add',{
            title: 'Add Task',
            displayName: req.user ? req.user.displayName:''
        });
    }
    catch(err)
    {
        console.error(err);
        res.render('Task/list',{
            error:'Error on the server'
        });
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newTask = Task({
            "Title":req.body.Title,
            "Description":req.body.Description,
            "Priority":req.body.Priority,
            "Status":req.body.Status,
            "dueDate":req.body.dueDate,
        });
        Task.create(newTask).then(()=>{
            res.redirect('/todoList');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Task/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const taskToEdit= await Task.findById(id);
        res.render('Task/edit',
            {
                title:'Edit Task',
                displayName: req.user ? req.user.displayName:'',
                Task:taskToEdit
            });
    }
    catch(err)
    {
        console.error(err);
        res.render('Task/list', {
            error:'Error on Server'
        });
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedTask = Task({
            "_id":id,
            "Title":req.body.Title,
            "Description":req.body.Description,
            "Priority":req.body.Priority,
            "Status":req.body.Status,
            "dueDate":req.body.dueDate,
        });
        await Task.findByIdAndUpdate(id,updatedTask);
        res.redirect('/todoList');
    }
    catch(err){
        console.error(err);
        res.render('Task/list',{
            error:'Error on the server'
        });
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Task.deleteOne({_id:id}).then(()=>{
            res.redirect('/todoList')
        })
    }
    catch(error){
        console.error(err);
        res.render('Task/list',{
            error:'Error on the server'
        })
    }
});

module.exports = router;