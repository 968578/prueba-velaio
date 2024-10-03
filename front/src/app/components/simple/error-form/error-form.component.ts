import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-form',
  template: `
  <p class="m-0 p-0 text-danger fs-6" *ngIf="error">{{error}}</p>
  `
})
export class ErrorFormComponent {

  @Input() error: string = "";
}
