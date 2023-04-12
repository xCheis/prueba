import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() btnText: string = 'texto base';
  @Output() eventBtn:EventEmitter<boolean> = new EventEmitter();
  @Input() validation = {disabled: false};

  public action() {
    this.eventBtn.emit(true);
  }

}
