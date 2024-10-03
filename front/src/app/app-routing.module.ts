import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaFormTareasComponent } from './pages/tabla-form-tareas/tabla-form-tareas.component';

const routes: Routes = [
  {
    path: "", component: TablaFormTareasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
