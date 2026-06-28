export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  category: string;
  priority: string;
  image?: string;
  isCompleted: boolean;
}