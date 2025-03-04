import {Component} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'ltg-menu-bar',
  imports: [
    ButtonDirective,
    RouterLink,
  ],
  templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {

}
