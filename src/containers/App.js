import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
        <div id="status-list">
          {statuses.map( status => {
            const { name, projects, count: statusCount } = status;
            return (
              <div className="status-col" key={name}>
                <div className="title">
                  <div className="name">{name}</div>
                  <div className="count">{statusCount}</div>
                </div>
                <ul className="status-list">
                  {projects.map( project => {
                    const { name: projectName } = project;
                    return (
                      <li key={projectName}>{projectName}</li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
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
  const statuses = state.statuses.map( name => {
    const projects = state.projects.filter(({ status }) => name === status);
    const count = projects.length;
    return { name, projects, count };
  });

  return {
    count,
    statuses,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(CounterActions, dispatch)
//   };
// }
export default connect(
  mapStateToProps
  // ,mapDispatchToProps
)(App);
