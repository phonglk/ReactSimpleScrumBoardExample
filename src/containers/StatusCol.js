import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectItem from '../containers/ProjectItem';
import ItemTypes from '../constants/ItemTypes';
import DragRules from '../constants/DragRules';
import * as BoardActions from '../actions/BoardActions';
import { propsCollector } from '../containers/ProjectItem';

const colTarget = {
  hover(props, monitor) {
    const dragItem = monitor.getItem();

    // Checking status moving condition
    const draggingStatus = dragItem.status;
    const hoveringStatus = props.name;

    if (draggingStatus === hoveringStatus) return;
    if (DragRules[draggingStatus].indexOf(hoveringStatus) === -1) {
      return;
    }

    if (monitor.isOver({ shallow: true })) {
      // Time to actually perform the action
      const lastItem = props.projects[props.projects.length - 1];
      console.log('drop');
      props.actions.moveProject(dragItem, propsCollector(lastItem));
    }
  }
};

@DropTarget(ItemTypes.PROJECT, colTarget, conn => ({
  connectDropTarget: conn.dropTarget()
}))
export class StatusCol extends Component {
  static propTypes = {
    name: PropTypes.string,
    isDroppable: PropTypes.string,
    projects: PropTypes.array,
    count: PropTypes.number,
    connectDropTarget: PropTypes.func.isRequired,
  }

  render() {
    const { name, projects, count, isDroppable, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className={`status-col drag-${isDroppable}`}>
        <div className="title">
          <div className="name">{name}</div>
          <div className="count">
            <span className="count">{count}</span>
            PROJECTS
          </div>
        </div>
        <ul className="status-list">
          {projects.map((project, index) =>
            <ProjectItem
              key={project.name}
              index={index}
              {...project}
            />)}
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BoardActions, dispatch)
  };
}
export default connect(
  () => ({}),
  mapDispatchToProps,
)(StatusCol);
