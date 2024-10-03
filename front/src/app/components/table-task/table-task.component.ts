import { Component, OnInit } from '@angular/core';
import { Task, TaskState } from 'src/app/services/interfaces';
import { TaskService } from 'src/app/services/task-services';

@Component({
  selector: 'table-task-c',
  templateUrl: './table-task.component.html',
})
export class TableTaskComponent implements OnInit {

  taskStates: TaskState[] = ['Todas', 'Pendiente', 'Cerrada']
  selectedState: TaskState = "Todas";
  tasks!: Task[];

  constructor(
    private taskService: TaskService
  ) {}

  // inicia pidiendo los datos de la tabla
  ngOnInit(): void {
    this.getTasks();
  }

  // obtiene los datos de las tareas
  getTasks(state = this.selectedState) {
    this.taskService.getTask(this.selectedState).subscribe(
      (res: any) => {
        if (res.name == "ok") {
          this.tasks = res.data;
        } else {
          console.log("Hay error");
        }
      }
    )
  }

  // se ejecuta cuando cambia el filtro de estados de las tareas
  changeFilter(){
    this.getTasks();
  }

  // marca una tarea como cerrada
  closeTask(idTask: number) {
    this.taskService.doneTask(idTask).subscribe(
      (res:any) => {
        if(res.name == "ok"){
          this.getTasks();
        } else {
          console.log("Hay errpr")
        }
      }
    )
  }

  // elimina una tarea de la base de datos
  deleteTask(idTask: number) {
    this.taskService.deleteTask(idTask).subscribe(
      (res: any) => {
        console.log(res)
        if (res.name == "ok") {
          console.log("hecho");
          this.getTasks();
        } else {
          console.log("error");
        }
      }
    )
  }
}
