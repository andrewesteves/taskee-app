import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../../environments/environment';
import { ProjectEntity } from 'src/app/entities/project.entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  readonly url: string = `${ENV.api}/projects`;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * List all resources
   * 
   * @return {Promise}
   */
  async index(): Promise<any> {
    const response = this.http.get(this.url)
      .pipe(
        map(
          (data: ProjectEntity[]) => data,
        )
      ).toPromise();
    return response;
  }

  /**
   * Create a new resource
   * 
   * @param {ProjectEntity} project
   * @return {Promise} 
   */
  async store(project: ProjectEntity): Promise<{ project, ProjectEntity, message: string }> {
    const response = this.http.post(`${this.url}`, {
      'description': project.description,
    })
      .pipe(
        map(
          (data: { project, ProjectEntity, message: string }) => data,
        )
      ).toPromise();
    return response;
  }
}
