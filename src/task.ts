import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmitterVisitorContext } from '@angular/compiler';

@Component({
  selector: 'task',
  standalone: true,
  imports: [CommonModule],
  template: `
    {{ text }} 
    <button (click)="changeStatus()">{{ done ? 'Przywróć' : 'Zakończ' }}</button>
  `,
})
export class Task {
  @Input() text = '';
  @Input() id = 0;
  @Input() done = false;
  @Output() statusChanged = new EventEmitter();
  changeStatus() {
    this.statusChanged.emit();
  }
}
