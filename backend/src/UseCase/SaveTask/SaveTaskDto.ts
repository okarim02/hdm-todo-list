import { TaskStatus } from '../TaskStatus';

export default class SaveTaskDto {
  id: null | number;
  name: string;
  status: TaskStatus;
  priority: number;
}
