import React from "react";
export function TodoList({getTodoList,handleClick}){
    return (
        <div>
        <a href="#" onClick={handleClick}>Add Todo</a>
        <ul>

            {
                getTodoList.map(function (todo,index){
                    return <li key={index}>{todo.name}</li>;
                })

            }

        </ul>
        </div>
    )
}