import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {ButtonDirective} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'ltg-menu-bar',
  imports: [
    Menubar,
    Menubar,
    ButtonDirective,
    RouterLink
  ],
  templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {


  public items: MenuItem[] =[
      {
        label: 'Inventaire',
        icon: 'pi pi-home',
        href: '/'
      }
    ];

}
