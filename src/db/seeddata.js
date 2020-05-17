module.exports = {
  accounts: [
    {
      accountId: 'DEMOACCOUNT',
      accountName: 'Demo Account',
    },
    {
      accountId: 'JUSTICLEAGUE',
      accountName: 'Justice League',
    },
  ],
  accountUsers: [
    {
      userId: 'USER0001',
      password: 'password',
      accountId: 'DEMOACCOUNT',
      firstName: 'James',
      lastName: 'Bond',
    },
    {
      userId: 'USER0002',
      password: 'password',
      accountId: 'DEMOACCOUNT',
      firstName: 'Jason',
      lastName: 'Bourne',
    },
    {
      userId: 'USER0003',
      password: 'password',
      accountId: 'JUSTICLEAGUE',
      firstName: 'Iron',
      lastName: 'Man',
    },
    {
      userId: 'USER0004',
      password: 'password',
      accountId: 'JUSTICLEAGUE',
      firstName: 'Spider',
      lastName: 'Man',
    },
  ],
  projects: [
    {
      projectId: 'PROJ0001',
      projectName: 'Fly Rocket to Moon',
      projectDescription:
        'To fly rocket to moon with human passengers by 2025. The rocket will carry two astronauts.',
      accountId: 'DEMOACCOUNT',
    },
    {
      projectId: 'PROJ0002',
      projectName: 'Fly Rocket to Mars',
      projectDescription:
        'To fly rocket to mars with human passengers by 2030. The rocket will carry twenty astronauts.',
      accountId: 'DEMOACCOUNT',
    },
    {
      projectId: 'PROJ0003',
      projectName: 'Stop Godzilla',
      projectDescription:
        'Godzilla is in New York city. Stop and send him back to jungle',
      accountId: 'JUSTICLEAGUE',
    },
  ],
  projectGroups: [
    {
      projectId: 'PROJ0001',
      userId: 'USER0001',
    },
    {
      projectId: 'PROJ0002',
      userId: 'USER0001',
    },
    {
      projectId: 'PROJ0001',
      userId: 'USER0002',
    },
    {
      projectId: 'PROJ0002',
      userId: 'USER0002',
    },
    {
      projectId: 'PROJ0003',
      userId: 'USER0003',
    },
    {
      projectId: 'PROJ0003',
      userId: 'USER0004',
    },
  ],
  todos: [
    {
      id: 1,
      projectId: 'PROJ0001',
      userId: 'USER0001',
      description: 'Fuel oxygen tank',
      completed: false,
    },
    {
      id: 2,
      projectId: 'PROJ0001',
      userId: 'USER0002',
      description: 'Design crew vessel',
      completed: false,
    },
    {
      id: 3,
      projectId: 'PROJ0002',
      userId: 'USER0002',
      description: 'Bring supplies',
      completed: false,
    },
    {
      id: 4,
      projectId: 'PROJ0002',
      userId: 'USER0001',
      description: 'Search Mars in Google map',
      completed: false,
    },
  ],
};
