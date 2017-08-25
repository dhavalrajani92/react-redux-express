import React,{Component} from "react";
import {connect} from "react-redux";
import {hydrateTodoList,todoLoding} from "./actions";
import {TodoList} from "../component/todoList";
class todoLists extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.props.hydrateTodoList();

    }
    handleClick(e){
        e.preventDefault();
        this.props.router.push('/addTodo');
    }
    render(){
        const {getTodoList,todoListLoading} = this.props;
        if(todoListLoading === true){
            return( <div>
                loading
            </div>);
        }
        return (
            <div>
                <TodoList handleClick={this.handleClick} getTodoList={getTodoList}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        getTodoList: state.todoList.todoList,
        todoListLoading:state.todoList.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        hydrateTodoList:()=> dispatch(hydrateTodoList()),
        todoLoding:()=> dispatch(todoLoding())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(todoLists);