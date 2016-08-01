import {
  MOVE_PROJECT,
  START_DRAG_PROJECT,
  END_DRAG_PROJECT,
  ADD_PROJECT,
} from '../constants/ActionTypes';

export function moveProject(sourceProject, targetProject) {
  return {
    type: MOVE_PROJECT,
    sourceProject,
    targetProject,
  };
}

export function addProject(project) {
  return {
    type: ADD_PROJECT,
    project,
  };
}

export function startDragProject(project) {
  return {
    type: START_DRAG_PROJECT,
    project,
  };
}

export function endDragProject(project) {
  return {
    type: END_DRAG_PROJECT,
    project,
  };
}
