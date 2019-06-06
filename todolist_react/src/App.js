import React, { Component} from 'react';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import About from './components/pages/About';

import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {
    todos: [
     
    ]
  }

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(res => this.setState({todos: res.data}))
  }

  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
  })
  // this.state.todos.map(todo => {
  //   if (todo.id === id) {
  //     todo.completed = !todo.completed;
  //   }
  //   this.setState(todo);
  // })
  }

  delTodo = (id) => {
    Axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
    
  }

  addTodo = (title) => {
    const newId = this.state.todos.length + 1;
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false,
      id: newId
    })
    .then(res => this.setState({todos: [...this.state.todos, res.data]}));
    
  }


  render() {
    //console.log(this.state.todos)
    return (
      <Router>
  
      <div className='App'>
        <div className='container'>
        <Header></Header>
        <Route exact path='/' render={props => (<React.Fragment>
          <Todos  todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
        <AddTodo addTodo={this.addTodo}></AddTodo>
        </React.Fragment>)}></Route>
        <Route path='/about' component={About}></Route>
        </div>
      </div>
            
      </Router>
    );
  }
}

export default App;
