import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/services/interfaces';
import { TaskService } from 'src/app/services/task-services';


@Component({
  selector: 'form-task-c',
  templateUrl: './form-task.component.html',
})
export class FormTaskComponent implements OnInit {

  // formularios
  taskForm: FormGroup;
  userForm: FormGroup;

  // input de skill
  @ViewChild('skill') skillInp!: ElementRef;

  // para marcar el formulario como enviado
  submittedTask: boolean = false;
  alreadyName: boolean = false;
  submittedUser: boolean = false;

  // para emitir al componente padre cuando se crea una tarea para refrescar la tabla
  @Output() taskWasCreated = new EventEmitter<void>();

  ngOnInit(): void {
    // para que limpie el error de nombre existente
    this.userForm.get("name")?.valueChanges.subscribe(() => {
      this.alreadyName = false
    })
  }

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {

    // se crea el formulario de las tareas
    this.taskForm = this.fb.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      users: this.fb.array([], Validators.required),
    });

    // se crea el formulario de los usuarios
    this.userForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5)]],
      age: ["", [Validators.required, Validators.min(18), Validators.pattern("^[0-9]*$")]],
      skills: this.fb.array([], Validators.required),
    });

  }

  // obtiene el formulario de las tareas
  get fTask() {
    return this.taskForm.controls
  }

  // obtiene el arreglo de usuarios que hay dentro del formulario de tareas
  get fUsers() {
    return this.taskForm.controls["users"] as FormArray;
  }

  // envia al backend la tarea para ser creada
  submitTask() {
    this.submittedTask = true;
    // si el formulario es invalido que pare la ejecución de la función
    if (!this.taskForm.valid) {
      return
    }
    this.taskService.saveTaks(this.taskForm.value).subscribe(
      (res: any) => {
        if (res.name == "ok") {
          this.clearTaskForm();
          this.taskWasCreated.emit();
        } else {
          console.log("Hay error");
        }
      }
    );
  }

  // agrega el usuario a la tarea
  addUser() {
    this.submittedUser = true;
    // si el formulario de los usuarios no es valido para la funcion
    if (!this.userForm.valid) {
      return
    }

    if (this.verifyNameExist()) {
      this.alreadyName = true;
      return
    }

    const dataUser = this.userForm.value;
    const formGroupUser = this.fb.group({
      name: [dataUser.name],
      age: [dataUser.age],
      skills: [dataUser.skills]
    });

    this.fUsers.push(formGroupUser);
    this.clearUserForm();
    this.alreadyName = false;
    this.submittedUser = false;
  }

  // valida que no haya dos usuarios con el mismo nombre en la tarea
  verifyNameExist(): boolean {
    const newName = (this.userForm.value.name as string).toLowerCase();
    const oldNames: string[] = this.fUsers.value.map((u: User) => u.name.toLowerCase()) || [];
    const verifyName = oldNames.find(n => n == newName);
    return Boolean(verifyName);
  }
  // elimina un usuario de la tarea
  deleteUser(index: number) {
    this.fUsers.removeAt(index)
  }

  // limpia el formulario de las tareas
  clearTaskForm() {
    this.submittedTask = false;
    for (let key in this.taskForm.controls) {
      if (key == "users") {
        this.fUsers.clear();
      } else {
        this.taskForm.controls[key].setValue("");
      }
    }
  }

  // limpia el formulario del usuario
  clearUserForm() {
    for (let key in this.userForm.controls) {
      if (key == "skills") {
        this.fSkills.clear();
      } else {
        this.userForm.controls[key].setValue("");
      }
    }
  }

  // obtiene el arreglo de skild del formulario de usuarios
  get fSkills() {
    return this.userForm.controls["skills"] as FormArray
  }

  // agrega una habilidad al usuario 
  addSkill() {
    const skill = this.skillInp.nativeElement.value;
    if (!skill) {
      return
    }
    const controlSkill = this.fb.control(skill);
    this.fSkills.push(controlSkill);
    this.skillInp.nativeElement.value = "";
  }

  // Elimina una habilidad del usuario
  deleteSkill(index: number) {
    this.fSkills.removeAt(index);
  }
}
