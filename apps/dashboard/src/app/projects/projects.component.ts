import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {
  Customer,
  Project,
  ProjectsService,
  NotificationsService,
  CustomersService,
  ProjectsState, AddProject, UpdateProject, DeleteProject, LoadProjects, initialProjects
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
      map(data => data.entities),
      map(data => Object.keys(data).map(k => data[k])),
      tap(console.log)
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
    this.store.dispatch(new LoadProjects(initialProjects))
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    const newProject = new AddProject(project)
    console.log(newProject)
    this.store.dispatch(newProject)

    // todo - get rid of this
    this.ns.emit('Project created!');
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project))

    // todo - get rid of this
    this.ns.emit('Project saved!');
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project.id))

    // todo - get rid of this
    this.ns.emit('Project deleted!');
  }
}

