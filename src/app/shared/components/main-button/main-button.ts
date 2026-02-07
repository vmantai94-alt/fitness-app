import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './main-button.html',
  styleUrl: './main-button.css',
})
export class MainButton {
  @Output() buttonClicked = new EventEmitter<void>();

  toggleInputs() {
    console.log('Button clicked in MainButton');
    this.buttonClicked.emit();
  }
}
