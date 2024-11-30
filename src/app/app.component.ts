import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderOptionComponent } from './components/header-option/header-option.component';
import { LogoContainerComponent } from './components/logo-container/logo-container.component';
import { NavigationComponent } from './components/navigation/navigation.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LogoContainerComponent,
    HeaderOptionComponent,
    NavigationComponent,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat_crafter';
}
