export interface TaskGroup {
  id: number;
  name: string;
  description?: string;
  color?: string;
}

export interface ITaskFormData {
  id?: number; // For editing
  taskGroup: TaskGroup | null;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  status: 'todo' | 'inprogress' | 'done';
}
