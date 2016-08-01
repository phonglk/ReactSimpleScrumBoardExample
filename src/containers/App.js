import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import MainBoard from '../components/MainBoard';
import { addProject } from '../actions/BoardActions';
import DragRules from '../constants/DragRules';

export default class App extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    statuses: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      projectInput: '',
      reminder: '',
    };
  }

  @autobind
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const project = this.state.projectInput.trim();
      if (project !== '') {
        this.props.dispatch(addProject(project));
        this.setState({ projectInput: '', reminder: '' });
        setTimeout(() => this.refs.input.focus(), 300);
      }
    }
  }

  @autobind
  handleChange(event) {
    const input = event.target.value;
    this.setState({ projectInput: input });
    if (input.trim() !== '') {
      this.setState({ reminder: 'press enter to add' });
    } else {
      this.setState({ reminder: '' });
    }
  }

  render() {
    const { count, statuses } = this.props;
    return (
      <div className="main-app-container">
        <div id="header">
          <div className="add-wrapper">
            Add Project
            <input
              type="text"
              ref="input"
              placeholder="new project ..."
              value={this.state.projectInput}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
            &nbsp;{this.state.reminder}
          </div>
          <div className="project-stats">
            TOTAL <div><span className="count">{count}</span>PROJECTS</div>
          </div>
        </div>
        <MainBoard statuses={statuses} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const count = state.projects.length;
  const statuses = state.statuses.map(name => {
    const projects = state.projects
                      .filter(({ status }) => name === status)
                      .map(project => ({
                        ...project,
                        isDragging: state.draggingItem && project.name === state.draggingItem.name
                        ? true : false,
                      }));
    const localCount = projects.length;
    let isDroppable = 'none';
    if (state.draggingItem !== null) {
      if (DragRules[state.draggingItem.status].indexOf(name) > -1) {
        isDroppable = 'yes';
      } else {
        isDroppable = 'no';
      }
    }

    return { name, projects, count: localCount, isDroppable };
  });

  return {
    count,
    statuses,
  };
}

export default connect(
  mapStateToProps,
)(App);
