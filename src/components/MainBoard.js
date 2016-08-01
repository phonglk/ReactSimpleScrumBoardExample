import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import StatusCol from './StatusCol';

@DragDropContext(HTML5Backend)
export default class MainBoard extends Component {
  static propTypes = {
    statuses: PropTypes.array,
  }
  render() {
    const { statuses } = this.props;
    return (<div id="status-list">
      {statuses.map(status => <StatusCol key={status.name} {...status} />)}
    </div>);
  }
}
