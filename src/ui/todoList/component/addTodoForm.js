import React from "react";

export function AddTodoForm({handleForm,handleSubmit}) {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => handleForm("name",e.target.value)}/>
        </form>
    )
}