import { Component, OnInit } from '@angular/core';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectsService } from '../services/projects/projects.service';
import { TaskEntity } from '../entities/task.entity';
import { TasksService } from '../services/tasks/tasks.service';
import { IonItemSliding, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  projects: ProjectEntity[];
  newProject: ProjectEntity;
  newTask: TaskEntity;

  constructor(
    private projectsService: ProjectsService,
    private tasksService: TasksService,
  ) { }

  /**
   * On Init
   * 
   * @return {void}
   */
  ngOnInit() {
    this.loadAll();
  }

  /**
   * Load all data
   * 
   * @return {Promise}
   */
  async loadAll(): Promise<void> {
    try {
      this.projects = await this.projectsService.index();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Create a new task resource
   * 
   * @param {ProjectEntity} project
   * @param {IonInput} task
   * @return {void}
   */
  async taskStore(project: ProjectEntity, task: IonInput): Promise<void> {
    try {
      const newTask = new TaskEntity({
        ProjectID: project.ID,
        description: task.value.toString(),
      });
      const taskDB = (await this.tasksService.store(newTask)).task;
      this.projects = this.projects.map((p: ProjectEntity) => {
        if (p.ID != project.ID) {
          return p;
        }
        if (!p.tasks) {
          p.tasks = [];
        }
        p.tasks.push(taskDB);
        return p;
      });
      task.value = '';
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Destroy task resource
   * 
   * @param {TaskEntity} task
   * @param {IonItemSliding} slidingItem
   * @return {void}
   */
  async taskDestroy(task: TaskEntity, slidingItem: IonItemSliding): Promise<void> {
    try {
      await this.tasksService.destroy(task);
      this.projects = this.projects.map((p: ProjectEntity) => {
        if (p.ID != task.ProjectID) {
          return p;
        }
        p.tasks = p.tasks.filter((t: TaskEntity) => t.ID != task.ID);
        return p;
      });
      slidingItem.close();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Mark task as done
   * 
   * @param {TaskEntity} task
   * @param {IonItemSliding} slidingItem
   * @return {void}
   */
  async taskDone(task: TaskEntity, slidingItem: IonItemSliding): Promise<void> {
    try {
      task.completedAt = (new Date()).toISOString();
      await this.tasksService.update(task);

      this.projects = this.projects.map((p: ProjectEntity) => {
        if (p.ID != task.ProjectID) {
          return p;
        }
        p.tasks = p.tasks.map((t: TaskEntity) => {
          if (t.ID == task.ID) {
            t.completedAt = task.completedAt;
          }
          return t;
        });
        return p;
      });

      slidingItem.close();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Edit task resource
   * 
   * @param {TaskEntity} task
   * @param {IonItemSliding} slidingItem
   * @return {void}
   */
  async taskEdit(task: TaskEntity, slidingItem: IonItemSliding): Promise<void> {
    try {
      this.newTask = task;
      slidingItem.close();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Update task resource
   * 
   * @param {IonInput} task
   * @return {void}
   */
  async taskUpdate(task: IonInput): Promise<void> {
    try {
      this.newTask.description = task.value.toString();
      await this.tasksService.update(this.newTask);
      this.projects = this.projects.map((p: ProjectEntity) => {
        if (p.ID != this.newTask.ProjectID) {
          return p;
        }
        p.tasks = p.tasks.map((t: TaskEntity) => {
          if (t.ID == this.newTask.ID) {
            t.description = this.newTask.description;
          }
          return t;
        });
        return p;
      });
      this.newTask = null;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Show form to create or edit a project
   * 
   * @param {ProjectEntity} project
   * @return {void}
   */
  projectForm(project?: ProjectEntity) {
    if (project) {
      this.newProject = project;
    } else {
      this.newProject = new ProjectEntity();
    }
  }

  /**
   * Create a new project resource
   * 
   * @return {void}
   */
  async projectStore(): Promise<void> {
    try {
      const projectDB = (await this.projectsService.store(this.newProject)).project;
      this.projects.push(projectDB);
      this.newProject = null;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Destroy project resource
   * 
   * @param {ProjectEntity} project
   * @return {void}
   */
  async projectDestroy(project: ProjectEntity): Promise<void> {
    try {
      await this.projectsService.destroy(project);
      this.projects = this.projects.filter((p: ProjectEntity) => p.ID != project.ID);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Update project resource
   * 
   * @return {void}
   */
  async projectUpdate(): Promise<void> {
    try {
      await this.projectsService.update(this.newProject);
    } catch (error) {
      console.error(error);
    }
  }
}
