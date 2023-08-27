import { Injectable } from '@angular/core';
import { ITodo, ITodoForm } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos: ITodo[] = []
  todoForm: ITodoForm = {
    taskName: "",
    taskDescription: ""
  }


  constructor() {
    const getTodos = localStorage.getItem("todos")
    if (getTodos) {
      this.todos = JSON.parse(getTodos)
    }
  }


  get getTodos(): ITodo[] {
    return this.todos
  }

  get getTodoForm() {
    return this.todoForm
  }


  deleteTodo(id: string) {
    const findTodos = this.todos.findIndex(elm => elm.id === id)
    if (findTodos !== -1) {
      this.todos.splice(findTodos, 1)
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }

  addTodo() {

    const newTodo: ITodo = {
      name: this.todoForm.taskName,
      description: this.todoForm.taskDescription,
      id: new Date().toString()
    }

    this.todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(this.todos))

    this.todoForm.taskName = ""
    this.todoForm.taskDescription = ""
  }

}
