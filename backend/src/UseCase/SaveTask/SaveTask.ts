import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from 'src';
import { TaskStatus } from '../TaskStatus';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTask
  implements UseCase<Promise<void>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<void> {
    if (!dto.name || dto.name.trim().length === 0) {
      throw new BadRequestException('Task name is required');
    }
    if (!Object.values(TaskStatus).includes(dto.status)) {
      throw new BadRequestException('Invalid task status');
    }
    if (dto.priority == null || dto.priority < 1 || dto.priority > 4) {
      throw new BadRequestException('Invalid task priority');
    }
    try {
      await this.taskRepository.save(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
