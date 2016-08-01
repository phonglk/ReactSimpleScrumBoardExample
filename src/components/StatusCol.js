import React, { Component, PropTypes } from 'react';
import ProjectItem from '../containers/ProjectItem';

export default class StatusCol extends Component {
  static propTypes = {
    name: PropTypes.string,
    isDroppable: PropTypes.string,
    projects: PropTypes.array,
    count: PropTypes.number,
  }

  render() {
    const { name, projects, count, isDroppable } = this.props;
    return (
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
