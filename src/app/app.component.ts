import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoContainerComponent } from './components/logo-container/logo-container.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LogoContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat_crafter';
}
