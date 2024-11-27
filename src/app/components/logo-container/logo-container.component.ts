import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-logo-container',
  imports: [NgOptimizedImage],
  templateUrl: './logo-container.component.html',
  styleUrl: './logo-container.component.scss',
})
export class LogoContainerComponent {}
