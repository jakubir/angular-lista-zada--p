import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

import { Task } from './task/task.component';
import { TaskInterface } from './interfaces/task.interface';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, Task],
  styles: [
    `
    h1 {
      text-align: center;
    }
  `,
  ],
  template: `
    <h1>Zadania do wykonania</h1>
    <ul>
      <li *ngFor="let task of pendingTasks"><task [text]="task.text" [done]="false" (statusChanged)="endTask(task.id)" /></li>
    </ul>
    <button (click)="addTask()">Dodaj zadanie</button>
    <hr>
    <h1>Wykonane</h1>
    <ul>
      <li *ngFor="let task of doneTasks"><task [text]="task.text" [done]="true" (statusChanged)="restoreTask(task.id)" /></li>
    </ul>
    <button (click)="removeDoneTasks()">Usuń wykonane zadania</button>
    `,
})
export class App {
  pendingTasks: TaskInterface[] = [
    { id: 1, text: 'Zadanie 1' },
    { id: 2, text: 'Zadanie 2' },
    { id: 3, text: 'Zadanie 3' },
  ];
  doneTasks: TaskInterface[] = [];

  number = 4;
  addTask() {
    this.pendingTasks.push({ id: this.number, text: 'Zadanie ' + this.number });
    this.number++;
  }
  removeDoneTasks() {
    this.doneTasks = [];
  }
  endTask = (id: number) => {
    let taskToEnd = this.pendingTasks.find(
      (task: TaskInterface) => task.id == id
    ) || { id: id, text: 'Zadanie ' + id };
    let a = this.pendingTasks.splice(this.pendingTasks.indexOf(taskToEnd), 1);
    this.doneTasks.push({ id: id, text: 'Zadanie ' + id });
  };
  restoreTask = (id: number) => {
    let taskToRestore = this.doneTasks.find(
      (task: TaskInterface) => task.id == id
    ) || { id: id, text: 'Zadanie ' + id };
    this.doneTasks.splice(this.doneTasks.indexOf(taskToRestore), 1);
    this.pendingTasks.push({ id: id, text: 'Zadanie ' + id });
  };
}

bootstrapApplication(App);
