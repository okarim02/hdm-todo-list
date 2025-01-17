import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  private readonly logger = new Logger(TaskRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findById(id: number) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    const id = data.id as number | undefined;
    if (id == null) {
      this.logger.log('Creating a new task with data:', { name: data.name });
      try {
        return await this.prisma.task.create({
          data: data as Prisma.TaskCreateInput,
        });
      } catch (error) {
        this.logger.error('Error creating task:', error);
        throw new Error('Failed to create task');
      }
    }

    // Check if the task exists before updating
    const existingTask = await this.findById(id);
    if (!existingTask) {
      throw new Error('Task with id ' + id + ' not found');
    }

    this.logger.log('Updating task with ID:', id);
    try {
      return await this.prisma.task.update({
        where: { id },
        data: data as Prisma.TaskUpdateInput,
      });
    } catch (error) {
      this.logger.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  }
}
