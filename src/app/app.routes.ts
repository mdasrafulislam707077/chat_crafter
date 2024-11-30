import { Routes } from '@angular/router';
import { ConditionComponent } from './pages/condition/condition.component';
import { CustomActionsComponent } from './pages/custom-actions/custom-actions.component';
import { EntitiesComponent } from './pages/entities/entities.component';
import { IntentsComponent } from './pages/intents/intents.component';
import { ResponseComponent } from './pages/response/response.component';
import { ScriptsComponent } from './pages/scripts/scripts.component';
import { SynonymsComponent } from './pages/synonyms/synonyms.component';
import { TaskComponent } from './pages/task/task.component';
export const routes: Routes = [
  {
    path: '',
    component: IntentsComponent,
  },
  {
    path: 'response',
    component: ResponseComponent,
  },
  {
    path: 'custom-actions',
    component: CustomActionsComponent,
  },
  {
    path: 'entities',
    component: EntitiesComponent,
  },
  {
    path: 'task',
    component: TaskComponent,
  },
  {
    path: 'synonyms',
    component: SynonymsComponent,
  },
  {
    path: 'condition',
    component: ConditionComponent,
  },
  {
    path: 'scripts',
    component: ScriptsComponent,
  },
];
