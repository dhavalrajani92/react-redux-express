import {
    HYDRATE_TODO_LIST,
    TODO_LIST_LOADING,
    TODO_LIST_SUCCESS,
    TODO_LIST_FORM_CHANGE,
    TODO_LIST_FORM_SUCCESS,
    TODO_LIST_FORM_REDIRECT_INIT
} from "./constants";

"./constants";


function todoListReducer(state = {todoList:[],loading:false,addTodo:{},shouldRedirect:false},{type,payload}){
    switch (type) {
        case HYDRATE_TODO_LIST:
            //return state .setIn(['profileForm', payload.prop], payload.value);
            return Object.assign({},state,{todoList:payload});
        case TODO_LIST_LOADING:
            return Object.assign({},state,{loading:true})

        case TODO_LIST_SUCCESS:
            return Object.assign({},state,{loading:false})
        case TODO_LIST_FORM_CHANGE:{
            const finalPayLoad = {};
            finalPayLoad[payload.prop] = payload.value;
            return Object.assign({},state,{addTodo:finalPayLoad});
        }
        case TODO_LIST_FORM_SUCCESS:
            return Object.assign({},state,{shouldRedirect:true});
        case TODO_LIST_FORM_REDIRECT_INIT:
            return Object.assign({},state,{shouldRedirect:false});
        default:
            return state;
    }
}


export default todoListReducer;