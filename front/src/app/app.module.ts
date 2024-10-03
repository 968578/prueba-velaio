import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablaFormTareasComponent } from './pages/tabla-form-tareas/tabla-form-tareas.component';
import { FormTaskComponent } from './components/form-task/form-task.component';
import { TableTaskComponent } from './components/table-task/table-task.component';
import { LblPrimaryComponent } from './components/simple/lbl-primary/lbl-primary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorFormComponent } from './components/simple/error-form/error-form.component';
import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TablaFormTareasComponent,
    FormTaskComponent,
    TableTaskComponent, 
    LblPrimaryComponent,
    ErrorFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
