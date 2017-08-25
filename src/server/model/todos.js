import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

const todos = mongoose.model('todos', todoSchema);
module.exports = todos;