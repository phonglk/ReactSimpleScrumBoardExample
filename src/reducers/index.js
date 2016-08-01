import {
  ADD_PROJECT,
  MOVE_PROJECT,
  START_DRAG_PROJECT,
  END_DRAG_PROJECT,
} from '../constants/ActionTypes';

function findProjectIndex(projects, project) {
  const projectObject = projects.find(pro => pro.name === project.name);
  const projectIndex = projects.indexOf(projectObject);
  return projectIndex;
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_PROJECT: {
      if (state.projects.find(({ name }) => action.project === name)) {
        /* eslint-disable no-alert */
        alert(`Project '${action.project}' is already in the list`);
        return state;
      }
      const projects = state.projects.slice(0);
      projects.push({
        name: action.project,
        status: 'To do',
      });
      return {
        ...state,
        projects
      };
    }
    case MOVE_PROJECT: {
      const { sourceProject, targetProject } = action;
      const findIndex = findProjectIndex.bind(null, state.projects);
      const sourceIndex = findIndex(sourceProject);
      const targetIndex = findIndex(targetProject);

      const migratedProject = { ...sourceProject, status: targetProject.status };
      const projects = state.projects.slice(0);
      projects.splice(sourceIndex, 1);
      projects.splice(targetIndex, 0, migratedProject);
      return {
        ...state,
        projects,
      };
    }

    case START_DRAG_PROJECT:
      return {
        ...state,
        draggingItem: action.project.name,
      };

    case END_DRAG_PROJECT:
      return {
        ...state,
        draggingItem: null,
      };

    default:
      return state;
  }
}
