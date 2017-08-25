import React,{Component} from "react";
import {AddTodoForm} from "../component/addTodoForm";
import {connect} from "react-redux";
import {handleForm,handleSubmitAction,addTodoSuccess,addTodoRedirectInit} from "./actions";
class addTodo extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.shouldRedirect == true){
            this.props.router.push('/');
            this.props.addTodoRedirectInit();
        }
    }

    handleSubmit(event){
        event.preventDefault();
        var formObject = this.props.getAddTodoFormValue;

        this.props.handleSubmitAction(formObject);
    }

    render(){
        const {handleForm} = this.props;
        return(
            <AddTodoForm handleForm={handleForm} handleSubmit={this.handleSubmit} />
        )

    }

}
function mapStateToProps(state) {
    return {
        getAddTodoFormValue:state.todoList.addTodo,
        shouldRedirect: state.todoList.shouldRedirect
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleForm:(prop,value) => dispatch(handleForm(prop,value)),
        handleSubmitAction:(formObject) => dispatch(handleSubmitAction(formObject)),
        addTodoSuccess:() => dispatch(addTodoSuccess()),
        addTodoRedirectInit:() => dispatch(addTodoRedirectInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(addTodo)