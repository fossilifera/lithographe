import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuBarComponent} from './components/menu-bar/menu-bar.component';

@Component({
  selector: 'ltg-root',
  imports: [RouterOutlet, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lithographe';
}
