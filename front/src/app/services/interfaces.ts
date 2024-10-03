export interface User {
  name: string;
  age: number;
  skills: string[];
}

export interface Task {
  id?: number;
  title: string;
  date: Date;
  users: User[];
  state?: TaskState | undefined;    
}

export type TaskState = "Pendiente" | "Cerrada" | "Todas"
