import {Project} from '@workshop/core-data';

const initialProjects: Project[] = [
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
export interface ProjectsState {
  projects: Project[],
  selectedProjectId: string | null
}

// 02 Define our initial state
export const initialState: ProjectsState = {
  projects: initialProjects,
  selectedProjectId: null
}

// 03 Build a simple reducer
export function projectsReducer(state = initialState, action): ProjectsState {
  switch (action.type) {
    default:
      return state
  }
}
