import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // Validate the task name no empty
    if (!dto.name || dto.name.trim().length === 0) {
      throw new BadRequestException('Task name is required');
    }

    try {
      // If id exists, update the task, else create a new one
      return await this.taskRepository.save({ name: dto.name });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
