import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import SaveTask from './SaveTask/SaveTask';

type UseCases = GetAllTasksUseCase | DeleteTask | SaveTask;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> { }
