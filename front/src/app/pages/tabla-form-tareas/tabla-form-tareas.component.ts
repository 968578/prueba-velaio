import { Component, Output, ViewChild } from '@angular/core';
import { TableTaskComponent } from 'src/app/components/table-task/table-task.component';

@Component({
  selector: 'app-tabla-form-tareas',
  templateUrl: './tabla-form-tareas.component.html',
})
export class TablaFormTareasComponent {

  // obtengo la tabla para recargar sus datos cuando se crea una tarea nueva
  @ViewChild('tableTaskC') tableTask!: TableTaskComponent

  onTaskWasCreated(){
    this.tableTask.getTasks();
  }
}
