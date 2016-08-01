import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import DragRules from '../constants/DragRules';
import * as BoardActions from '../actions/BoardActions';
// import _ from 'lodash';

// reference: https://github.com/gaearon/react-dnd/blob/master/examples/04%20Sortable/Simple/Card.js
export const propsCollector = ({ name, index, status, isDragging }) =>
                        ({ name, index, status, isDragging });

const projectSource = {
  beginDrag(props) {
    const project = propsCollector(props);
    props.actions.startDragProject(project);
    return project;
  },

  endDrag(props) {
    props.actions.endDragProject(propsCollector(props));
  }
};
const projectTarget = {
  hover(props, monitor, component) {
    const dragItem = monitor.getItem();
    const hoverItem = propsCollector(props);
    const dragIndex = dragItem.index;
    const hoverIndex = hoverItem.index;

    if (dragItem.name === hoverItem.name) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }


    // Checking status moving condition
    const draggingStatus = dragItem.status;
    const hoveringStatus = props.status;

    if (DragRules[draggingStatus].indexOf(hoveringStatus) === -1) {
      return;
    }

    // Time to actually perform the action
    props.actions.moveProject(dragItem, hoverItem);
  }
};

@DropTarget(ItemTypes.PROJECT, projectTarget, conn => ({
  connectDropTarget: conn.dropTarget()
}))
@DragSource(ItemTypes.PROJECT, projectSource, conn => ({
  connectDragSource: conn.dragSource()
}))
class ProjectItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    actions: PropTypes.object,
  };

  render() {
    const { name, isDragging, connectDragSource,
      connectDropTarget } = this.props;
    const opacity = isDragging === true ? 0.6 : 1;
    return connectDragSource(connectDropTarget(
      <li style={{ opacity }}>{name}</li>
    ));
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
)(ProjectItem);
