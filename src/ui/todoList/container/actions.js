import {
    HYDRATE_TODO_LIST,
    TODO_LIST_LOADING,
    TODO_LIST_SUCCESS,
    TODO_LIST_FORM_CHANGE,
    TODO_LIST_FORM_SUBMIT,
    TODO_LIST_FORM_SUCCESS,
    TODO_LIST_FORM_REDIRECT_INIT
} from "./constants";
import axios from "axios";
import { push } from 'react-router-redux'
export function hydrateTodoList() {
    return (dispatch) => {
        dispatch({
            type:TODO_LIST_LOADING
        });
        axios.get('/api/todos')
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    dispatch({
                        type: HYDRATE_TODO_LIST,
                        payload: response.data,
                    });
                }
                return dispatch({
                    type: TODO_LIST_SUCCESS,
                });
            })
            .catch(function (error) {
                console.log(error);
            });


    }
}


export function todoLoding(){
    return {
        type: TODO_LIST_LOADING,
    };
}

export function toLoadingSuccess(){
    return {
        type: TODO_LIST_SUCCESS,
    };
}

export function handleForm(prop,value) {
    return {
        type: TODO_LIST_FORM_CHANGE,
        payload:{prop,value}
    };
}

export function handleSubmitAction(formObject) {
    return (dispatch) => {
      axios.post("/api/todos",formObject).then((response) => {
          console.log(response);
          dispatch({
              type: TODO_LIST_FORM_SUBMIT,
          })
          return dispatch({
              type:TODO_LIST_FORM_SUCCESS
          })
      });


    };


}

export function addTodoSuccess() {
    return {
        type:TODO_LIST_FORM_SUCCESS
    }
}

export function addTodoRedirectInit() {
    return {
        type:TODO_LIST_FORM_REDIRECT_INIT
    }
}