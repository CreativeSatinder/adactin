export type Priority = 'low' | 'medium' | 'high';
export type StatusFilter = 'all' | 'active' | 'completed';
export type PriorityFilter = 'all' | Priority;

export interface TodoItem {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string | null;
  store: string;
  completed: boolean;
  createdAt: string;
}
