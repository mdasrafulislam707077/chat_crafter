import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store'; // Import 'select' for cleaner state selection
import { HeaderOptionComponent } from './components/header-option/header-option.component';
import { LogoContainerComponent } from './components/logo-container/logo-container.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BotInfo } from './model/botInfoModel';
import { selectBotInfo } from './ngrx/botinfo/selectors/botinfo';
import { AppState } from './ngrx/store';
import { DialogBoxComponent } from "./components/dialog-box/dialog-box.component";
import { QusBoxComponent } from "./components/qus-box/qus-box.component"; // Import your AppState interface or reducer definition
// import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LogoContainerComponent,
    HeaderOptionComponent,
    NavigationComponent,
    CommonModule,
    HttpClientModule,
    DialogBoxComponent,
    QusBoxComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'chat_crafter';
  botInfo: BotInfo | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.pipe(select(selectBotInfo)).subscribe((botInfo: any) => {
      this.botInfo = botInfo;
      this.botInfo = this.botInfo;
    });
  }
}
