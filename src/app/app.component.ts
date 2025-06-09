import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuBarComponent} from './shared/menu-bar/menu-bar.component';
import {ModalComponent} from './shared/modal/modal.component';

@Component({
  selector: 'ltg-root',
  imports: [RouterOutlet, MenuBarComponent, ModalComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'lithographe';
}
