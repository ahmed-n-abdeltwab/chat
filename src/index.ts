import { startServer } from './server';

startServer()
  .then(() => {
    console.log('Server is running');
  })
  .catch(error => {
    console.error('Failed to start server:', error);
  });
