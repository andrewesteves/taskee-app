import { Component, OnInit } from '@angular/core';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectsService } from '../services/projects/projects.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  projects: ProjectEntity[];

  constructor(
    private projectsService: ProjectsService,
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
}
