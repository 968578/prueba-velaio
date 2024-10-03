import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Task, TaskState } from "./interfaces";
import { Observable } from "rxjs";

// servicio que va a manejar las tareas
@Injectable({
  providedIn: "root"
})
export class TaskService {
  private apiUrl = "http://localhost:3001/api/task"

  constructor(
    private http: HttpClient
  ) { }

  // envia una tarea al backend
  saveTaks(task: Task) {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // recibe las tareas del backend
  getTask(state: TaskState): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?state=${state}`);
  }

  // marca la tarea como cerrada
  doneTask(idTask: number) {
    return this.http.post(`${this.apiUrl}/close`, { id: idTask })
  }

  // marca la tarea como cerrada
  deleteTask(idTask: number) {
    return this.http.delete(`${this.apiUrl}/${idTask}`)
  }

}