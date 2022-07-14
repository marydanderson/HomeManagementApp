import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() loginSuccessMessage: string;
  @Output() close = new EventEmitter<void>(); //close alert box

  onClose() {
    this.close.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
