const initialState = {
  projects: [
    { name: 'Project 1', status: 'To do' },
    { name: 'Project 2', status: 'To do' },
    { name: 'Project 3', status: 'To do' },
    { name: 'Project 4', status: 'In Progress' },
    { name: 'Project 5', status: 'In Progress' },
    { name: 'Project 6', status: 'In Progress' },
    { name: 'Project 7', status: 'In Progress' },
    { name: 'Project 8', status: 'Done' },
    { name: 'Project 9', status: 'Done' },
  ],
  statuses: ['To do', 'In Progress', 'Done'],
  draggingItem: null,
};

export default initialState;
