import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import todoLists from "../todoList/container/todos";
import addTodo from "../todoList/container/addTodo";

const Routes = (props) => (
    <Router history={browserHistory}>
        <Route path='/'>
            <IndexRoute component={todoLists} />
            <Route path="/addTodo" component={addTodo}/>
        </Route>
    </Router>
)

export default Routes;