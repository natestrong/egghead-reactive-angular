import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {
  Customer,
  Project,
  ProjectsService,
  NotificationsService,
  CustomersService,
  ProjectsState
} from '@workshop/core-data';
import {select, Store} from "@ngrx/store";
import {map, tap} from "rxjs/operators";

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private customerService: CustomersService,
    private ns: NotificationsService,
    private projectsService: ProjectsService,
    private store: Store<any>
  ) {
    this.projects$ = store.pipe(
      select('projects'),
      map((p: ProjectsState) => p.projects)
    )
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all();  // for now
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch({type: 'create', payload: project})

    // todo - get rid of this
    this.ns.emit('Project created!');
    this.getProjects();
  }

  updateProject(project) {
    this.store.dispatch({type: 'update', payload: project})

    // todo - get rid of this
    this.ns.emit('Project saved!');
    this.getProjects();
  }

  deleteProject(project) {
    this.store.dispatch({type: 'delete', payload: project})

    // todo - get rid of this
    this.ns.emit('Project deleted!');
    this.getProjects();
  }
}

