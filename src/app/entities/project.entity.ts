import { TaskEntity } from './task.entity';

export class ProjectEntity {
    ID: string;
    description: string;
    tasks: TaskEntity[];
}