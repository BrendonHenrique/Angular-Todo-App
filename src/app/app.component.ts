import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'Angular Todo List ';
  public form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])],
      done: [false, Validators.required],
    });

    this.load();
  }


  // Form Functions
  add() {
    const form = this.form.value;
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.clear();
    this.save();
  }

  clear() {
    this.form.controls.title.reset();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    this.todos = JSON.parse(data);
  }


  // Todo Functions
  getIndexByTodo(todo: Todo):number {
    return this.todos.indexOf(todo);
  }

  remove(todo: Todo) {
    let index = this.getIndexByTodo(todo);
    if (index !== -1)  this.todos.splice(index, 1);
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false
    this.save();
  }

}
