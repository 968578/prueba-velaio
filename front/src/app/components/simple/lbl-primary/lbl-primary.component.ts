import { Component, Input } from '@angular/core';

@Component({
  selector: 'lbl-primary-c',
  template: `
  <label class="fw-semibold">{{value}}</label>
  `
})
export class LblPrimaryComponent {
  @Input() value: string = "";

}