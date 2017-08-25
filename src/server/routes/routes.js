import express from "express";
import todos from "../model/todos";
const router = express.Router();


router.route('/todos')
//retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        todos.find(function(err, todos) {
            if (err)
                res.send(err);
            //responds with a json object of our database comments.
            res.json(todos)
        });
    }).post(function(req, res) {
        var todo = new todos();
        console.log(req.body);
        (req.body.name) ? todo.name = req.body.name : "test";


        todo.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'todo successfully added!' });
        });
    });



module.exports = router;