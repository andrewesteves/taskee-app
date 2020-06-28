import { Injectable } from '@angular/core';
import { TaskEntity } from 'src/app/entities/task.entity';
import { environment as ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  readonly url: string = `${ENV.api}/tasks`;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Remove a resource
   * 
   * @param {TaskEntity} task
   * @return {Promise} 
   */
  async destroy(task: TaskEntity): Promise<{ message: string }> {
    const response = this.http.delete(`${this.url}/${task.ID}`)
      .pipe(
        map(
          (data: { message: string }) => data,
        )
      ).toPromise();
    return response;
  }

  /**
   * Create a new resource
   * 
   * @param {TaskEntity} task
   * @return {Promise} 
   */
  async store(task: TaskEntity): Promise<{ task, TaskEntity, message: string }> {
    const response = this.http.post(`${this.url}`, {
      'description': task.description,
      'projectID': task.ProjectID,
    })
      .pipe(
        map(
          (data: { task, TaskEntity, message: string }) => data,
        )
      ).toPromise();
    return response;
  }

  /**
   * Update a resource
   * 
   * @param {TaskEntity} task
   * @return {Promise} 
   */
  async update(task: TaskEntity): Promise<{ message: string }> {
    const response = this.http.put(`${this.url}/${task.ID}`, task)
      .pipe(
        map(
          (data: { message: string }) => data,
        )
      ).toPromise();
    return response;
  }
}
