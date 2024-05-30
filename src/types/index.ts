export interface ITaskData {
  weekTotal: number;
  monthTotal: number;
  total: number;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  statTime: number;
  endTime: number;
  totalTime: number;
  date: string;
  userId: string;
  status: ITaskStatus;
}

export type ITaskStatus = "unstarted" | "in_progress" | "paused";
