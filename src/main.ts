import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

import { Task } from './task';

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
      <li *ngFor="let task of doneTasks"><task [text]="task.text" [done]="true" (statusChanged)="endTask(task.id)" /></li>
    </ul>
  `,
})
export class App {
  pendingTasks: any = [
    { id: 1, text: 'Zadanie 1' },
    { id: 2, text: 'Zadanie 2' },
    { id: 3, text: 'Zadanie 3' },
  ];
  doneTasks: any = [];

  number = 4;
  addTask() {
    this.pendingTasks.push({ id: this.number, text: 'Zadanie ' + this.number });
    this.number++;
  }
  endTask = (id: number): void => {
    let taskToEnd = this.pendingTasks.find((task: any) => task.id == id);
    this.pendingTasks.splice(this.pendingTasks.indexOf(taskToEnd));
    this.doneTasks.push({ id: id, text: 'Zadanie ' + id });
  };
  retoreTask = (id: number): void => {
    let taskToRestore = this.doneTasks.find((task: any) => task.id == id);
    this.doneTasks.splice(this.doneTasks.indexOf(taskToRestore));
    this.pendingTasks.push({ id: id, text: 'Zadanie ' + id });
  };
}

bootstrapApplication(App);
