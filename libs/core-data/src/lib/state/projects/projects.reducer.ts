import {Project} from '@workshop/core-data';
import {ProjectsActionTypes} from "./projects.actions";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

// 01 define the shape of our state
export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null
}

// Create entity adapter
export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>()

// Define our initial state
export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
})

// Build a simple reducer
export function projectsReducer(state = initialState, action): ProjectsState {
  switch (action.type) {

    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({}, state, {selectedProjectId: action.payload})

    case ProjectsActionTypes.LoadProjects:
      return adapter.addMany(action.payload, state)

    case ProjectsActionTypes.AddProject:
      return adapter.addOne(action.payload, state)

    case ProjectsActionTypes.UpdateProject:
      return adapter.upsertOne(action.payload, state)

    case ProjectsActionTypes.DeleteProject:
      return adapter.removeOne(action.payload, state)

    default:
      return state
  }
}

// Selectors
export const getSelectedProjectId = (state: ProjectsState) => state.selectedProjectId

const {selectIds, selectEntities, selectAll} = adapter.getSelectors()
export const selectProjectIds = selectIds
export const selectProjectEntities = selectEntities
export const selectAllProjects = selectAll
