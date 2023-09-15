import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmitterVisitorContext } from '@angular/compiler';

@Component({
  selector: 'task',
  standalone: true,
  imports: [CommonModule],
  template: `
    {{ text }} 
    <button (click)="endTask()">Zakończ</button>
  `,
})
export class Task {
  @Input() text = '';
  @Input() id = 0;
  @Output() ended = new EventEmitter();
  endTask() {
    this.ended.emit();
  }
}
