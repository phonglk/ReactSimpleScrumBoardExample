import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MainBoard from '../components/MainBoard';

export default class App extends Component {
  render() {
    const { count, statuses } = this.props;
    return (
      <div className="main-app-container">
        <div id="header">
          <div className="add-wrapper">
            Add Project <input type="text" />
          </div>
          <div className="project-stats">
            Count: {count}
          </div>
        </div>
        <MainBoard statuses={statuses} />
      </div>
    );
  }
}

// App.propTypes = {
//   counter: PropTypes.number.isRequired,
//   actions: PropTypes.object.isRequired
// };

function mapStateToProps(state) {
  const count = state.projects.length;
  const statuses = state.statuses.map(name => {
    const projects = state.projects
                      .filter(({ status }) => name === status)
                      .map(project => ({
                        ...project,
                        isDragging: project.name === state.draggingItem ? true : false,
                      }));
    const count = projects.length;
    return { name, projects, count };
  });

  return {
    count,
    statuses,
  };
}

export default connect(
  mapStateToProps,
)(App);
