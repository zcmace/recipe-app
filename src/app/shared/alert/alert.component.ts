import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  onClose() {
    this.close.emit();
  }
}
